import request from "supertest";
import app from "../src/app.js";


let token;
let productId;


const testUser = {
    fullName: "Product Tester",
    phone: "8888888888",
    email: "producttester@gmail.com",
    password: "1234"
};



describe("Product API",()=>{


    // REGISTER USER FOR PRODUCT TESTING

    test("PRODUCT-000 Register user", async()=>{

        const response = await request(app)
        .post("/api/auth/register")
        .send(testUser);


        // If user already exists, ignore 409
        expect(
            [201,409]
        ).toContain(response.status);

    });



    // LOGIN

    test("PRODUCT-001 Login user for product testing", async()=>{


        const response = await request(app)
        .post("/api/auth/login")
        .send({

            email:testUser.email,
            password:testUser.password

        });


        expect(response.status).toBe(200);

        token=response.body.data.token;

        expect(token).toBeDefined();

    });




    // CREATE PRODUCT

    test("PRODUCT-002 Create product successfully", async()=>{


        const response = await request(app)
        .post("/api/products")
        .set(
            "Authorization",
            `Bearer ${token}`
        )
        .field("name","Handmade Vase")
        .field("description","Clay handmade vase")
        .field("category","Craft")
        .field("costPrice",500)
        .field("sellingPrice",800)
        .field("stockQuantity",10)
        .attach(
            "image",
            "C:\\Users\\ISHWARI\\Downloads\\test-image.jpg"
        );


        expect(response.status).toBe(201);

        expect(response.body.data).toBeDefined();


        productId=response.body.data._id;


    });




    // GET ALL PRODUCTS

    test("PRODUCT-003 Get all products", async()=>{


        const response = await request(app)
        .get("/api/products")
        .set(
            "Authorization",
            `Bearer ${token}`
        );


        expect(response.status).toBe(200);

        expect(
            response.body.data.length
        ).toBeGreaterThan(0);


    });





    // GET PRODUCT BY ID

    test("PRODUCT-004 Get product by id", async()=>{


        const response = await request(app)
        .get(`/api/products/${productId}`)
        .set(
            "Authorization",
            `Bearer ${token}`
        );


        expect(response.status).toBe(200);


    });






    // UPDATE PRODUCT

    test("PRODUCT-005 Update product successfully", async()=>{


        const response = await request(app)
        .put(`/api/products/${productId}`)
        .set(
            "Authorization",
            `Bearer ${token}`
        )
        .field(
            "name",
            "Updated Handmade Vase"
        )
        .field(
            "sellingPrice",
            900
        );


        expect(response.status).toBe(200);


    });






    // DELETE PRODUCT

    test("PRODUCT-006 Delete product successfully", async()=>{


        const response = await request(app)
        .delete(`/api/products/${productId}`)
        .set(
            "Authorization",
            `Bearer ${token}`
        );


        expect(response.status).toBe(200);


    });







    // CREATE WITHOUT IMAGE

    test("PRODUCT-007 Create product without image", async()=>{


        const response = await request(app)
        .post("/api/products")
        .set(
            "Authorization",
            `Bearer ${token}`
        )
        .field("name","No Image Product")
        .field("category","Craft")
        .field("costPrice",100)
        .field("sellingPrice",200)
        .field("stockQuantity",5);



        expect(response.status).toBe(400);


    });







    // NEGATIVE STOCK

    test("PRODUCT-008 Create product with negative stock", async()=>{


        const response = await request(app)
        .post("/api/products")
        .set(
            "Authorization",
            `Bearer ${token}`
        )
        .field("name","Invalid Product")
        .field("category","Craft")
        .field("costPrice",100)
        .field("sellingPrice",200)
        .field("stockQuantity",-5)
        .attach(
            "image",
            "C:\\Users\\ISHWARI\\Downloads\\test-image.jpg"
        );



        expect(response.status).toBe(400);


    });



});