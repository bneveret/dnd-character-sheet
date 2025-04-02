const mongodb = require('../config/database');
const { ObjectId } = require("mongodb");

  // Get all items
const getAll = async (req, res) => {
  const db = mongodb.getDb();
  const result = await db.collection('Items').find().toArray();
  res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  };

  // Get a single item by ID
  const getSingle = async (req, res) => {
    try {
      const itemId = new ObjectId(req.params.id);
      const db = mongodb.getDb();
      const result = await db.collection('Item').findOne({ _id: itemId });
  
      if (!result) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } catch (error) {
      console.error('Error getting item by ID', error);
      return res.status(500).json({ message: 'Failed to retrieve item' });
    }
  };

  // Create a new item
  const createItem = async (req, res) => {
    try {
      const { itemName, type, rarity, cost, description, damage, weight, isMagic } = req.body;

      if (!itemName || !type || !rarity || !cost || !description || !damage || !weight || !isMagic) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }

      const newItem = {
        itemName,
        type,
        rarity,
        cost,
        description,
        damage,
        weight,
        isMagic,

      };

      const db = mongodb.getDb();
      const result = await db.collection('Item').insertOne(newItem);

      if (result.acknowledged) {
        return res.status(201).json({ id: result.insertedId });
      } else {
        return res.status(500).json({ message: 'Failed to create item' });
      }

    } catch (error) {
      console.error('Error creating item', error);
      return res.status(500).json({ message: 'Failed to create item' });
    };
  
  };

  // Update item
  const updateItem = async (req, res) => {
    try {
      const itemId = new ObjectId(req.params.id);
  
      const { itemName, type, rarity, cost, description, damage, weight, isMagic } = req.body;
  
      if (!itemName && !type && !rarity && !cost && !description && !damage && !weight && !isMagic) {
        return res.status(400).json({ message: 'Please provide at least one field to update' });
      }
  
      const updateInfo = {}
      if (itemName) updateInfo.itemName = itemName;
      if (type) updateInfo.type = type;
      if (rarity) updateInfo.rarity = rarity;
      if (cost) updateInfo.cost = cost;
      if (description) updateInfo.description = description;
      if (damage) updateInfo.damage = damage;
      if (weight) updateInfo.weight = weight;
      if (isMagic) updateInfo.isMagic = isMagic;
  
      const db = mongodb.getDb();
      const result = await db.collection('Item').updateOne(
        { _id: itemId },
        { $set: updateInfo }
      );
  
      if (result.matchedCount === 1) {
        return res.status(200).json({ message: 'Item updated' });
      } else {
        return res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      console.error('Error updating item', error);
      return res.status(500).json({ message: 'Failed to update item' });
    }
  };

  // Delete item
  const deleteItem = async (req, res) => {
    try {
      const itemId = new ObjectId(req.params.id);

      const db = mongodb.getDb();
      const result = await db.collection('Item').deleteOne({ _id: itemId });
  
      if (result.deletedCount === 1) {
        return res.status(200).json({ message: 'Item deleted' });
      } else {
        return res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      console.error('Error deleting item', error);
      return res.status(500).json({ message: 'Failed to delete item' });
    }
  };

module.exports= {getAll, getSingle, createItem, updateItem, deleteItem};