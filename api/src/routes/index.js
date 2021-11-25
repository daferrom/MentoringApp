const { Router } = require('express')
const auth = require('../middleware/auth')

const FormStudentRouter = require('../controllers/formStudent')

const VotingCapsulesRouter = require('../controllers/votingCapsules')

const ViewStudentRouter = require('../controllers/mentorViewStudent')

const menAvailRouter = require('../controllers/mentorAvailability')

const StudentsRouter = require('../controllers/studentsControl')

const sessionRouter = require('../controllers/session')

const userRouter = require('../controllers/user')

const dashBoardRouter = require('../controllers/dashBoard')

const answerBankRouter = require('../controllers/answerBank')

const questionBankRouter = require('../controllers/questionBank')

const UpdateMentorRouter = require('../controllers/editMentor')
// const notifMentorRouter = require('../controllers/notif-mentor')
const profilEditRouter = require('../controllers/profilEdit')

const notifMentorRouter = require('../controllers/notif-mentor')

const router = Router()

router.use('/api/formStudent', FormStudentRouter.FormStudentRouter)

router.use('/api/answerform', FormStudentRouter.AnswerFormRouter)

router.use('/api/votingCapsules', VotingCapsulesRouter.VotingCapsulesRouter)

router.use('/api/mentorViewStudent', ViewStudentRouter.ViewStudentRouter)

router.use('/api/questionFormRouter', ViewStudentRouter.QuestionFormRouter)

router.use('/api/updateCapsules', VotingCapsulesRouter.updateCapsulesRouter)

router.use('/api/mentor-availability', menAvailRouter)

router.use('/api/students-control', StudentsRouter.getAllStudentsRouter)

router.use('/api/students-control-update', StudentsRouter.updatedUserRouter)

router.use('/api/students-control-post', StudentsRouter.postUserRouter)



router.use(
  '/api/studentsPerfil-control-update',
  StudentsRouter.updatedProfileRouter
)

router.use('/api/session', sessionRouter)

// login

router.use('/api/login', userRouter.loginRouter)

router.use('/api/info', auth, userRouter.userRouter)

router.use('/api/forgot', userRouter.forgotPassRouter)

router.use('/api/register_admin', userRouter.registerAdminRouter)

router.use('/api/register', userRouter.registerRouter)

router.use('/api/activation', userRouter.activateEmailRouter)

router.use('/api/refresh_token', userRouter.getAccessToken)

//others

router.use('/api/dashboard', dashBoardRouter.userRouter)

router.use('/api/dashboard/answer', dashBoardRouter.answerRouter)

router.use('/api/answerBank', answerBankRouter)

router.use('/api/questionBank', questionBankRouter)

router.use('/api/dashboard/assignedsession', dashBoardRouter.assigSessionRouter)

// router.use('/api/notif-mentor', notifMentorRouter)
router.use('/api/editMentor', UpdateMentorRouter)

router.use('/api/dashboard/infoStudent', dashBoardRouter.infoStudentRouter)

router.use('/api/profile-edit', profilEditRouter.profilEditRouter)

router.use('/api/updated-profile-edit', profilEditRouter.updatedprofilEditRouter)

router.use('/api/notif-mentor', notifMentorRouter)

module.exports = router