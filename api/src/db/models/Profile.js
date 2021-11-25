const { Schema, model } = require('mongoose')
const User = require('../models/User')

// schema creation for profiles
const profileSchema = new Schema({
  user_id: {
    type: Schema.ObjectId,
    ref: User
  },

  /* Agora */

  outcome: {
    outcome1: {
      generalcomment: {
        type: String
      },
      techcomment: {
        type: String
      },
      aprove: {
        type: Boolean,
        default: true
      }
    },
    outcome2: {
      generalcomment: {
        type: String
      },
      techcomment: {
        type: String
      },
      aprove: {
        type: Boolean,
        default: true
      }
    },
    outcome3: {
      generalcomment: {
        type: String
      },
      techcomment: {
        type: String
      },
      aprove: {
        type: Boolean,
        default: true
      }
    },
    outcome4: {
      generalcomment: {
        type: String
      },
      techcomment: {
        type: String
      },
      aprove: {
        type: Boolean,
        default: true
      }
    },
    outcome5: {
      generalcomment: {
        type: String
      },
      techcomment: {
        type: String
      },
      aprove: {
        type: Boolean,
        default: true
      }
    },
    outcome6: {
      generalcomment: {
        type: String
      },
      techcomment: {
        type: String
      },
      aprove: {
        type: Boolean,
        default: true
      }
    }
  },

  badges: {
    badges1: {
      aprove: {
        type: Boolean,
        default: true
      }
    },
    badges2: {
      aprove: {
        type: Boolean,
        default: true
      }
    },
    badges3: {
      aprove: {
        type: Boolean,
        default: true
      }
    },
    badges4: {
      aprove: {
        type: Boolean,
        default: true
      }
    },
    badges5: {
      aprove: {
        type: Boolean,
        default: true
      }
    }
  },

  /* fin Agora */

  /* mentoria */

  // the ft key stores the gender profile
  gender: {
    type: Number
  },

  // the academic_level key stores the academic level of the profile
  academic_level: {
    type: Number
  },

  // the idUser key stores the age of the profile
  actualAge: {
    type: Number
  },

  // the idUser key stores the profile photo
  photo: {
    type: String
  },

  // The ActualJobPosition key stores the current position of the mentor
  ActualJobPosition: String,

  // The Company key stores the mentor's current job
  Company: String,

  // The sons key stores the mentor's children
  sons: Number,

  // The interests key stores the mentor's interests
  interestsMentor: [String],

  // The numeStudents key stores the number of students the mentor wants
  numeStudents: Number,

  // The idUser key stores the assigned students
  studentAssignment: [
    {
      type: Schema.ObjectId,
      ref: User
    }
  ],

  // the assignedMentor key stores the mentor assigned to the student
  assignedMentor: {
    type: String
  },

  // the interests key stores the student's selected interests
  interestsStudent: {
    type: Array
  },

  // The commitment key stores a participation score that is used to determine the student and mentor assignment.
  commitment: Number,

  // The achievementOrientation key stores the achievement orientation score that is used to determine the student and mentor assignment.
  achievementOrientation: Number,

  // The flexibility key stores the flexibility score that is used to determine the student and mentor assignment.
  flexibility: Number,

  // The assertiveCommunication key stores the assertive communication score that is used to determine the student and mentor assignment.
  assertiveCommunication: Number,

  // The studentsGenderPrefer key stores the student's gender preference score that is used to determine the student and mentor assignment.
  studentsGenderPrefer: Number, // 1=Man 2=Women 3=other

  /* fin mentoria */

  /* Social Programate */

  experience: {
    type: 'string',
    trim: true,
    lowercase: true
  },

  description: {
    type: 'string',
    trim: true,
    require: true,
    lowercase: true
  },
  github: {
    type: 'string',
    trim: true,
    require: true,
    lowercase: true
  },
  softSkills: {
    type: 'string',
    trim: true,
    require: true,
    lowercase: true
  },
  technicalSkills: {
    type: 'string',
    trim: true,
    require: true,
    lowercase: true
  },

  /* fin social programate */

  /* Proceso de seleccion */
  documentType: {
    type: Number
  },
  documentNumber: {
    type: Number,
    minlength: 6
  },
  // documentPdf: {
  //   type: binData,
  //
  // },
  secondContactNumber: {
    type: Number
  },
  nacionality: {
    type: String
  },
  residencyDepartment: String,
  municipalityOfResidency: String,
  locationInBogota: String,
  socioeconomicStratus: {
    type: Number
  },
  migrant: {
    type: Boolean
  },
  livesInColombia: {
    type: Boolean
  },
  address: {
    type: String,
    maxlength: 45
  },
  dateOfBirth: {
    type: Date
  },
  birthdayOnFormation: Date,

  maritalStatus: {
    type: Number
  },
  academicLevel: {
    type: Number
  },
  degreeTitle: {
    type: String,
    maxlength: 45
  },
  currentOccupation: {
    type: Number
  },
  unemployedTime: String,
  formaltOccupation: {
    type: Boolean,
    maxlength: 45
  },
  victimArmedConflict: {
    type: Boolean
  },
  pcAccess: {
    type: Boolean
  },
  programataPrevoiousTimes: {
    type: Number
  },
  motivation: {
    type: String,
    maxlength: 300
  },
  dreams: {
    type: String,
    maxlength: 300
  },
  soloLearnProfile: {
    type: Number,
    minlength: 6
  },
  status: {
    inscrito: Boolean,
    espera: Boolean,
    citado: Boolean,
    agendado: Boolean,
    entrevistado: Boolean,
    paso: Boolean
  },
  convocatoria: String,
  resultados: Number,
  fechaEntrevista: Date,
  urlPrueba: String,
  promedioEntrevista: Number

  /* fin proceso seleccion  */
})

// fixes in profileSchema
profileSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// compilation of Profile model
const Profile = model('Profile', profileSchema)

module.exports = Profile
