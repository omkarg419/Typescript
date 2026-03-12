import express from 'express';
import type { Application } from 'express';

export function createServerApplication(): Application{
const app=express()

app.get('/',function(req,res){
    return res.json({message:'Hello World'})
})

app.get('/om',function(req,res){
    return res.json({massage:'omkar gupta'})
})

    return app
}
