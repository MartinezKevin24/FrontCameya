const ApiRoutes = {
  auth: { 
    login: "https://apicameya.semard.co/auth/login",
    google: "https://apicameya.semard.co/auth/google",
  },
  profile: {
    update: "https://apicameya.semard.co/api/user/profile",
    change_photo: "https://apicameya.semard.co/api/user/profile/profile_picture"
  },
  services: {
    all: "https://apicameya.semard.co/api/service/all",
    create: "https://apicameya.semard.co/api/service/create",
    user: "https://apicameya.semard.co/api/service/suser",
    detail: "https://apicameya.semard.co/api/service/",
    update: "https://apicameya.semard.co/api/service/update",
    delete: "https://apicameya.semard.co/api/service/delete",
  }
}

export default ApiRoutes