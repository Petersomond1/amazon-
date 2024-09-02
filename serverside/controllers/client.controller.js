import db from '../config/db.js'

    export const getHomeProducts = async (req, res) =>{
        //when we recieve a request from the frontend , the data can be in different places 
        //it can be in the body and to access it we say req.body , it can be in the url if it's a post request  
        // and to acccess it we say req.params that's one
        //when we do a get request we cannot send the data , but in this controller , it's waiting for ids/data to do it's work, that's two
        // if we want to send data in get request t(hat does not support sendng data with a request, we can
        //send the data in a query , a query is a string at the end of the url that holds some data 
        //you can know that it's a query because you will see a "?" in the url and to access it we say req.query.<stringName>
        console.log("here is it ", req.query.ids)
        const ids = req.query.ids
        .replace(/[\[\]]/g, '')  // Remove square brackets
        .split(',')
        .map(Number);

        console.log("here is the ids ", ids);
        const sqlQuery = `
        SELECT p.* FROM products p WHERE p.id IN (?)
        `;

        const result = await db.query(sqlQuery, [ids]);
        console.log("here ", result[0]);
       
    }

export const getHomeCategories = async (req, res) =>{
    const ids = req.query.ids
    
}