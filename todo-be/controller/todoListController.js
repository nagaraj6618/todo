const listModel = require('../model/todoListModel')
const getAllItems = async(req,res) => {
  const listItems = await listModel.find()
  res.status(200).json(listItems)
  
}
const getAList = async(req,res) => {
  res.json(res.getList)
}
const addTodoItem = async(req,res) => {
  const {text} = req.body
  const newListModel = new listModel ({
    text:text,
    status:false
  })
  try{
    const newList = await newListModel.save()
    console.log(newList);
    res.status(200).json(newList)
  }
  catch(error){
    res.status(500).json({message:error.message})
  }
 }

 const updateTodoItem = async(req,res) => {
  const {text,status} = req.body
  if(text!== ''){
    res.getList.text = text 
    res.getList.status = status
  }
  try{
    const updateList = await res.getList.save()
    res.status(200).json(updateList)
  }
  catch(error){
    res.status(500).json({message:error.message})
  }
 }

 const deleteAListItem = async(req,res) => {
  try{
    const deleteList = await res.getList.deleteOne()
    res.status(200).json({message:`deleted the list`})
    console.log(deleteList);
  }
  catch(error){
    res.status(500).json({message:error.message})
  }
 }

 async function getList(req,res,next){
  let list
  try{
    list = await listModel.findById(req.params.id)
    if(list === null){
      return res.status(404).json({message:'The task is not found'})
    }
    
  }
  catch(error){
    res.status(500).json({message:error.message})
  }
  res.getList = list
  next()
 }
module.exports = {getAllItems,addTodoItem,updateTodoItem,getList,getAList,deleteAListItem}