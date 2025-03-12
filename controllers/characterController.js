const mongodb = require('../config/database');
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('Character').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });

  };

  const getSingle = async (req, res) => {
    const characterId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('Character').findOne({ _id: characterId });
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
  };

  const createCharacter = async (req, res) => {
    try {
      const { firstName, lastName, species, alignment, birthday } = req.body;

      if (!firstName || !lastName || !species || !alignment || !birthday) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }

      const newCharacter = {
        firstName,
        lastName,
        species,
        alignment,
        birthday,
      };

      const result = await mongodb.getDb().db().collection('Character').insertOne(newCharacter);

      if (result.acknowledged) {
        return res.status(201).json({ id: result.insertedId });
      } else {
        return res.status(500).json({ message: 'Failed to create character' });
      }

    } catch (error) {
      console.error('Error creating contact', error);
      return res.status(500).json({ message: 'Failed to create character' });
    };
  
  };

  const updateCharacter = async (req, res) => {
    try {
      const characterId = new ObjectId(req.params.id);
  
      const { firstName, lastName, species, alignment, birthday } = req.body;
  
      if (!firstName && !lastName && !species && !alignment && !birthday) {
        return res.status(400).json({ message: 'Please provide at least one field to update' });
      }
  
      const updateInfo = {}
      if (firstName) updateInfo.firstName = firstName;
      if (lastName) updateInfo.lastName = lastName;
      if (species) updateInfo.species = species;
      if (alignment) updateInfo.alignment = alignment;
      if (birthday) updateInfo.birthday = birthday;
  
      const result = await mongodb.getDb().db().collection('Character').updateOne(
        { _id: characterId },
        { $set: updateInfo }
      );
  
      if (result.matchedCount === 1) {
        return res.status(204).json({ message: 'Character updated' });
      } else {
        return res.status(404).json({ message: 'Character not found' });
      }
    } catch (error) {
      console.error('Error updating character', error);
      return res.status(500).json({ message: 'Failed to update character' });
    }
  };

  const deleteCharacter = async (req, res) => {
    try {
      const characterId = new ObjectId(req.params.id);
  
      const result = await mongodb.getDb().db().collection('Character').deleteOne({ _id: characterId });
  
      if (result.deletedCount === 1) {
        return res.status(204).json({ message: 'Character deleted' });
      } else {
        return res.status(404).json({ message: 'Character not found' });
      }
    } catch (error) {
      console.error('Error deleting character', error);
      return res.status(500).json({ message: 'Failed to delete character' });
    }
  };

module.exports= {getAll, getSingle, createCharacter, updateCharacter, deleteCharacter};