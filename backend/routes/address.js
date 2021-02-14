const express = require('express');
const fetch = require('node-fetch');
const { resolve } = require('path');
const MongoClient = require('mongodb').MongoClient;

const Address = require('../models/address');

const router = express.Router();

const url = "mongodb://localhost:4200/";

// Get all addresses stored in database
router.get('/getall', (req, res) => {
  Address.find()
    .then(data => res.json(data))
    .catch(err => res.json(err))
})

// Get Insee data addresses in Paris
router.get('/:cityCode/:ape', (req, res) => {
  return new Promise((resolve, reject) => {
    fetch(`https://api.insee.fr/entreprises/sirene/V3/siret?q=codePostal2Etablissement:${req.params.cityCode}%20AND%20activitePrincipaleUniteLegale:${req.params.ape}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.INSEE_TOKEN}`
        }
      })
      .then(response => {
        if (!response.ok) {
          return res.json(response)
        } else {
          return response.json()
        }
      })
      .then(async data => {
        let merchantLocations = []
        for (let item of data.etablissements) {
          let query = ``;
          if (item.adresseEtablissement.numeroVoieEtablissement !== null) {
            query += `${item.adresseEtablissement.numeroVoieEtablissement}`
          }
          if (item.adresseEtablissement.typeVoieEtablissement !== null) {
            query += `+${item.adresseEtablissement.typeVoieEtablissement}`
          }
          if (item.adresseEtablissement.libelleVoieEtablissement !== null) {
            query += `+${item.adresseEtablissement.libelleVoieEtablissement}`
          }
          if (item.adresseEtablissement.codePostalEtablissement !== null) {
            query += `+${item.adresseEtablissement.codePostalEtablissement}`
          }

          let address = await getGeo(query)
          const newLocation = {
            name: item.uniteLegale.denominationUniteLegale,
            location: address.features[0].geometry,
            label: address.features[0].properties.label,
            postalCode: req.params.cityCode
          }
          let mongoAddresses = await createNewAddress(newLocation)

          merchantLocations.push(mongoAddresses)
        }
        return res.json(merchantLocations)
      })
      .catch(err => {
        return res.json(err)
      })
  })
});

// Get localisation
const getGeo = query => {
  return new Promise((resolve, reject) => {
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}&limit=1`)
      .then(response => {
        if (!response.ok) {
          return reject(response)
        } else {
          return response.json()
        }
      })
      .then(address => {
        console.log('new address', address)
        return resolve(address)
      })
      .catch(err => reject(err))
  })
}

const createNewAddress = address => {
  console.log('createNewAddress')
  return new Promise((resolve, reject) => {
    Address.create(address)
      .then(data => {
        console.log(data)
        return resolve(data)
      })
      .catch(err => {
        console.log(err)
        return reject(err)
      })
  })
}

router.get('/:cityCode/:ape', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('app-perso');
    dbo.collection('addresses').findOne({
        name: item.uniteLegale.denominationUniteLegale,
        location: address.features[0].geometry,
        label: address.features[0].properties.label,
        postalCode: req.params.cityCode,
      },
      function (err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
      });
    console.log(err);
  });
});

module.exports = router;
