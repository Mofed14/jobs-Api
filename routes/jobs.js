const express = require('express')
const router = express.Router()
const { getAllJobs, getJob, deleteJob, createJob, updateJob } = require('../controllers/jobs')

router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getJob).put(updateJob).delete(deleteJob)

module.exports = router