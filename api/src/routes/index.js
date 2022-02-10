const { Router } = require('express')
const auth = require('../middleware/auth')

//
const userRouter = require('../controllers/user')

const StudentsRouter = require('../controllers/studentsControl')

const profilEditRouter = require('../controllers/profilEdit')

const sessionRouter = require('../controllers/session')

const dashBoardRouter = require('../controllers/dashBoard')

const menAvailRouter = require('../controllers/mentorAvailability')

const assignedDateRouter = require('../controllers/assignedDate')

const FormStudentRouter = require('../controllers/formStudent')

const VotingCapsulesRouter = require('../controllers/votingCapsules')

const ViewStudentRouter = require('../controllers/mentorViewStudent')

const ConfirmDateRouter = require('../controllers/confirmDate')

const MentorControlRouter = require('../controllers/mentorControl')

const answerBankRouter = require('../controllers/answerBank')

const questionBankRouter = require('../controllers/questionBank')

const UpdateMentorRouter = require('../controllers/editMentor')
const SessionReportRouter = require('../controllers/sessionReport')
// const notifMentorRouter = require('../controllers/notif-mentor')

const notifMentorRouter = require('../controllers/notif-mentor')

const matchRouter = require('../controllers/match')

// route for upload csv
const uploadCsvRouter = require('../controllers/csvControl')

const router = Router()

// route for upload csv
router.use('/api/upload', uploadCsvRouter.uploadCsv)

router.use('/api/refresh_token', userRouter.getAccessToken)

router.use('/api/student-interest', StudentsRouter.getInterestStudent)

router.use('/api/login', userRouter.loginRouter)

router.use('/api/one/student', StudentsRouter.getOneStudentRouter)

router.use('/api/info/students', StudentsRouter.getInfoStudent)

router.use('/api/profile-edit', profilEditRouter.profilEditRouter)

router.use(
  '/api/studentsPerfil-control-update',
  StudentsRouter.updatedProfileRouter
)

router.use('/api/session', sessionRouter)

router.use('/api/dashboard/all/assigned-session', dashBoardRouter.allAssigSessionRouter)

router.use('/api/dashboard/assigned-session', dashBoardRouter.assigSessionRouter)

router.use('/api/mentor-availability', menAvailRouter)

router.use('/api/assigned-mentor', StudentsRouter.getAssiMentorRouter)

router.use('/api/assignedDate', assignedDateRouter)

router.use('/api/formStudent', FormStudentRouter.FormStudentRouter)

router.use('/api/answerform', FormStudentRouter.AnswerFormRouter)

router.use('/api/formSession', FormStudentRouter.FormSessionRouter)

router.use('/api/new/formSession', FormStudentRouter.FormSessionRouterPost)

router.use('/api/new/sessionReport', SessionReportRouter.SessRepRouterPost)

router.use('/api/votingCapsules', VotingCapsulesRouter.VotingCapsulesRouter)

router.use('/api/mentorViewStudent', ViewStudentRouter.ViewStudentRouter)

router.use('/api/questionFormRouter', ViewStudentRouter.QuestionFormRouter)

router.use('/api/mentorControl', MentorControlRouter.MentorControlRouter)
router.use('/api/formControl', MentorControlRouter.MentorFormRouter)

router.use('/api/one/mentor', MentorControlRouter.GetoneMentorRouter)

router.use('/api/updateCapsules', VotingCapsulesRouter.updateCapsulesRouter)

router.use('/api/confirmDate', ConfirmDateRouter)

router.use('/api/info', auth, userRouter.userRouter)

router.use('/api/forgot', userRouter.forgotPassRouter)

router.use('/api/register_admin', userRouter.registerAdminRouter)

router.use('/api/register', userRouter.registerRouter)

router.use('/api/activation', userRouter.activateEmailRouter)

router.use('/api/students/control', StudentsRouter.getAllStudentsRouter)

router.use('/api/students-control-post', StudentsRouter.postUserRouter)

router.use('/api/students-control-update', StudentsRouter.updatedUserRouter)

router.use('/api/dashboard', dashBoardRouter.userRouter)

router.use('/api/dashboard/answer', dashBoardRouter.answerRouter)

router.use('/api/answerBank', answerBankRouter)

router.use('/api/questionBank', questionBankRouter)

// router.use('/api/notif-mentor', notifMentorRouter)
router.use('/api/editMentor', UpdateMentorRouter)

router.use('/api/sessionReport', SessionReportRouter.SessionReportRouter)
// module.exports = router
router.use('/api/dashboard/infoStudent', dashBoardRouter.infoStudentRouter)

router.use(
  '/api/updated-profile-edit',
  profilEditRouter.updatedprofilEditRouter
)

router.use('/api/notif-mentor', notifMentorRouter)

router.use('/api/sessionReport', SessionReportRouter.SessionReportRouter)

router.use('/api/filledOut/session-report', SessionReportRouter.FilledOutSessRep)

router.use('/api/match', matchRouter.assignedRouter)

module.exports = router
