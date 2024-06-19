const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const slug = require('mongoose-slug-updater');
const mongoose_delete = require('mongoose-delete');



const Course = new Schema({
  //_id: { type: mongoose.SchemaTypes.ObjectId, required: true, index: true } ,
  name: { type: String, default: '' },
  description: { type: String, default: '', },
  image: { type: String, },
  videoId: { type: String, },
  slug: { type: String, slug: 'name', unique: true }
}, {
  timestamps: true,
});


//custom query helper
Course.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    const isValidType = ['asc', 'desc'].includes(req.query.type);
    return this.sort({
      [req.query.column]: isValidType ? req.query.type : 'asc'
    })
  }
  return this;
}



// add plugin
mongoose.plugin(slug);
Course.plugin(mongoose_delete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Course', Course);