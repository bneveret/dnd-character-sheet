const mongodb = require('../config/database');
const { ObjectId } = require("mongodb");

// Get all classes
const getAll = async (req, res) => {
  const db = mongodb.getDb();
  const result = await db.collection('Class').find().toArray();
  res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  };

  // Get a single class by ID
  const getSingle = async (req, res) => {
    try {
      const classId = new ObjectId(req.params.id);
      const db = mongodb.getDb();
      const result = await db.collection('Class').findOne({ _id: classId });
  
      if (!result) {
        return res.status(404).json({ message: 'Class not found' });
      }
  
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } catch (error) {
      console.error('Error getting class by ID', error);
      return res.status(500).json({ message: 'Failed to retrieve class' });
    }
  };

  // Create a new class
  const createClass = async (req, res) => {
    try {
      const { className, hitDie, primaryAttribute, savingThrows, proficiency, hitpointsAtFirstLevel, spellCastingAttribute, spellsKnown, cantripsKnown, spellSlotsPerLevel, } = req.body;

      if (!className || !hitDie || !primaryAttribute || !savingThrows || !proficiency || !hitpointsAtFirstLevel || !spellCastingAttribute || !spellsKnown || !cantripsKnown || !spellSlotsPerLevel) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }

      const newClass = {
        className,
        hitDie,
        primaryAttribute,
        savingThrows,
        proficiency,
        hitpointsAtFirstLevel,
        spellCastingAttribute,
        spellsKnown,
        cantripsKnown,
        spellSlotsPerLevel,

      };

      const db = mongodb.getDb();
      const result = await db.collection('Class').insertOne(newClass);

      if (result.acknowledged) {
        return res.status(201).json({ id: result.insertedId });
      } else {
        return res.status(500).json({ message: 'Failed to create class' });
      }

    } catch (error) {
      console.error('Error creating class', error);
      return res.status(500).json({ message: 'Failed to create class' });
    };
  
  };

  // Update a class
  const updateClass = async (req, res) => {
    try {
      const classId = new ObjectId(req.params.id);
  
      const { className, hitDie, primaryAttribute, savingThrows, proficiency, hitpointsAtFirstLevel, spellCastingAttribute, spellsKnown, cantripsKnown, spellSlotsPerLevel } = req.body;
  
      if (!className && !hitDie && !primaryAttribute && !savingThrows && !proficiency && !hitpointsAtFirstLevel && !spellCastingAttribute && !spellsKnown && !cantripsKnown && !spellSlotsPerLevel) {
        return res.status(400).json({ message: 'Please provide at least one field to update' });
      }
  
      const updateInfo = {}
      if (className) updateInfo.className = className;
      if (hitDie) updateInfo.hitDie = hitDie;
      if (primaryAttribute) updateInfo.primaryAttribute = primaryAttribute;
      if (savingThrows) updateInfo.savingThrows = savingThrows;
      if (proficiency) updateInfo.proficiency = proficiency;
      if (hitpointsAtFirstLevel) updateInfo.hitpointsAtFirstLevel = hitpointsAtFirstLevel;
      if (spellCastingAttribute) updateInfo.spellCastingAttribute = spellCastingAttribute;
      if (spellsKnown) updateInfo.spellsKnown = spellsKnown;
      if (cantripsKnown) updateInfo.cantripsKnown = cantripsKnown;
      if (spellSlotsPerLevel) updateInfo.spellSlotsPerLevel = spellSlotsPerLevel;
  
      const db = mongodb.getDb();
      const result = await db.collection('Class').updateOne(
        { _id: classId },
        { $set: updateInfo }
      );
  
      if (result.matchedCount === 1) {
        return res.status(204).json({ message: 'Class updated' });
      } else {
        return res.status(404).json({ message: 'Class not found' });
      }
    } catch (error) {
      console.error('Error updating class', error);
      return res.status(500).json({ message: 'Failed to update class' });
    }
  };

  // Delete a class
  const deleteClass = async (req, res) => {
    try {
      const classId = new ObjectId(req.params.id);

      const db = mongodb.getDb();
      const result = await db.collection('Class').deleteOne({ _id: classId });
  
      if (result.deletedCount === 1) {
        return res.status(204).json({ message: 'Class deleted' });
      } else {
        return res.status(404).json({ message: 'Class not found' });
      }
    } catch (error) {
      console.error('Error deleting class', error);
      return res.status(500).json({ message: 'Failed to delete class' });
    }
  };

module.exports= {getAll, getSingle, createClass, updateClass, deleteClass};