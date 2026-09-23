use std::net::TcpStream;
use std::path::PathBuf;
use std::sync::Mutex;
use std::time::Duration;

use tauri::Manager;
use tauri_plugin_shell::{process::CommandChild, ShellExt};

struct MongoProcess(Mutex<Option<CommandChild>>);

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            let data_dir = PathBuf::from(
                std::env::var("LOCALAPPDATA")
                    .expect("LOCALAPPDATA environment variable not found"),
            )
            .join("ArtisanSuite")
            .join("data");

            let db_dir = data_dir.join("db");
            std::fs::create_dir_all(&db_dir)?;

            let log_path = data_dir.join("mongodb.log");

            let db_dir_str = db_dir.to_string_lossy().to_string();
            let log_path_str = log_path.to_string_lossy().to_string();

            let (rx, child) = app
    .shell()
    .sidecar("mongod")?
    .args([
        "--dbpath",
        &db_dir_str,
        "--logpath",
        &log_path_str,
        "--port",
        "27017",
        "--bind_ip",
        "127.0.0.1",
    ])
    .spawn()?;

drop(rx);

let mut mongo_ready = false;

for _ in 0..50 {
    if TcpStream::connect_timeout(
        &"127.0.0.1:27017".parse().unwrap(),
        Duration::from_millis(200),
    )
    .is_ok()
    {
        mongo_ready = true;
        break;
    }

    std::thread::sleep(Duration::from_millis(200));
}

if !mongo_ready {
    let _ = child.kill();
    return Err("MongoDB failed to start on port 27017".into());
}

// MongoDB is confirmed ready, so now keep its process handle alive.
app.manage(MongoProcess(Mutex::new(Some(child))));

// Start backend only after MongoDB is ready.
let (_, backend_child) = app
    .shell()
    .sidecar("artisansuite-backend")?
    .spawn()?;

app.manage(backend_child);

Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}