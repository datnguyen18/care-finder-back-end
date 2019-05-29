const multer = require('multer');

const gcsSharp = require('multer-sharp');

const storage2 = gcsSharp({
  bucket: 'care-finder', // Required : bucket name to upload
  projectId: 'thinking-prism-229914', // Required : Google project ID
  keyFilename: './api/config/keyFilename.json', // Optional : JSON credentials file for Google Cloud Storage
  acl: 'publicRead', // Optional : acl credentials file for Google Cloud Storage, 'publicrRead' or 'private', default: 'private'
  size: {
    width: 400,
    height: 400
  },
  destination: 'public/image',
  max: true
});


const upload = multer({ storage: storage2 })

module.exports = upload;