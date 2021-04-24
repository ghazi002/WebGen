const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
let components = require("../models/components");

// READ (ALL)
router.get("/", (req, res) => {
    components
    .find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// READ (ONE)
router.get("/:id", (req, res) => {
    components
    .findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such component.` });
    });
});

// READ (ONE WITH ID-Interface)
router.get("/findByIdInt/:id", (req, res) => {
    components
      .find({ idInt: req.params.id })
      .then((result) => {
        success: true, res.json(result);
      })
      .catch((err) => {
        res.status(404).json({ success: false, msg: `No such project.` });
      });
  });

// ADD
router.post("/", (req, res) => {
  console.log(req.body);
  let newComponents = new components({
    idInt:req.body.idInt,
    posX:req.body.posX,
    posY: req.body.posY,
    type:req.body.type,
    value:req.body.value,
   
  });
  newComponents
    .save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
            _id: result._id,
            idInt:result.idInt,
            posX:result.posX,
            posY:result.posY,
            type:result.type,
            value:result.value,
        },
      });
    })
    .catch((err) => {
      if (err.errors) {
       
        if (err.errors.posX) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.posX.message });
          return;
        }
        if (err.errors.posY) {
            res
              .status(400)
              .json({ success: false, msg: err.errors.posY.message });
            return;
          }
        if (err.errors.type) {
          res
            .status(400)
            .json({ success: false, msg: err.errors.type.message });
          return;
        }
        if (err.errors.value) {
            res
              .status(400)
              .json({ success: false, msg: err.errors.value.message });
            return;
        }
        

        // Show failed if all else fails for some reasons
        res
          .status(500)
          .json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// DELETE
router.delete("/:id", (req, res) => {
    components
    .findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
                 _id: result._id,
                 idInt:result.idInt,
                 posX:result.posX,
                 posY:result.posY,
                 type:result.type,
                 value:result.value,
        },
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: "Nothing to delete." });
    });
});

router.put("/:id", (req, res) => {
  let updatedComponents = {
    idInt:req.body.idInt,
    posX:req.body.posX,
    posY: req.body.posY,
    type:req.body.type,
    value:req.body.value,
  };

  components
    .findOneAndUpdate({ _id: req.params.id }, updatedComponents, {
      runValidators: true,
      context: "query",
    })
    .then((oldResult) => {
        components
        .findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
                _id: result._id,
                 idInt:result.idInt,
                 posX:result.posX,
                 posY:result.posY,
                 type:result.type,
                 value:result.value,
            },
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      if (err.errors) {
        
        if (err.errors.posX) {
            res
              .status(400)
              .json({ success: false, msg: err.errors.posX.message });
            return;
          }
          if (err.errors.posY) {
              res
                .status(400)
                .json({ success: false, msg: err.errors.posY.message });
              return;
            }
          if (err.errors.type) {
            res
              .status(400)
              .json({ success: false, msg: err.errors.type.message });
            return;
          }
          if (err.errors.value) {
              res
                .status(400)
                .json({ success: false, msg: err.errors.value.message });
              return;
          }

        // Show failed if all else fails for some reasons
        res
          .status(500)
          .json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

module.exports = router;
