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
    all: "https://apicameya.semard.co/api/service",
  }
}

export default ApiRoutes