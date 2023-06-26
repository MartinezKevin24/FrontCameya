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
    updatePostulation: "https://apicameya.semard.co/api/service/updatePostulation"
  },
  categories: {
    index: "https://apicameya.semard.co/api/service/categories"
  },
  admin:{
    login: "https://apicameya.semard.co/api/admin/login"
  }
}

export default ApiRoutes