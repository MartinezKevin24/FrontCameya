const ApiRoutes = {
  auth: { 
    login: "https://apicameya.semard.co/auth/login",
    google: "https://apicameya.semard.co/auth/google",
    register: "https://apicameya.semard.co/auth/register",
  },
  profile: {
    update: "https://apicameya.semard.co/api/user/profile",
    change_photo: "https://apicameya.semard.co/api/user/profile/profile_picture"
  },
  services: {
    all: "https://apicameya.semard.co/api/service/all",
    create: "https://apicameya.semard.co/api/service/create",
    user: "https://apicameya.semard.co/api/service/suser",
    worker: "https://apicameya.semard.co/api/service/sworker",
    detail: "https://apicameya.semard.co/api/service/",
    update: "https://apicameya.semard.co/api/service/update",
    delete: "https://apicameya.semard.co/api/service/delete",
    postulation: "https://apicameya.semard.co/api/worker/AddPostulation",
    updatePostulation: "https://apicameya.semard.co/api/service/updatePostulation",
    cancelPostulation: "https://apicameya.semard.co/api/worker/RetireFromService",
    terminateWorkerService: "https://apicameya.semard.co/api/worker/terminateService",
    terminateUserService: "https://apicameya.semard.co/api/user/terminateService",
    ratingUser: "https://apicameya.semard.co/api/worker/score",
    ratingWorker: "https://apicameya.semard.co/api/user/score"
  },
  categories: {
    index: "https://apicameya.semard.co/api/service/getCategories"
  },
  admin:{
    login: "https://apicameya.semard.co/admin/login",
    deleteUser: "https://apicameya.semard.co/admin/deleteUser/",
    createCategory: "https://apicameya.semard.co/admin/createCategory",
    deleteCategory: "https://apicameya.semard.co/admin/deleteCategory/",
    deleteService: "https://apicameya.semard.co/admin/deleteService/",
  },
  filtrado: "https://apicameya.semard.co/api/service/"
}

export default ApiRoutes