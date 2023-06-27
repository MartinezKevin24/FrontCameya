import Button from "components/Button";
import React, {useState} from "react";
import Image from "next/image";
import FormField from 'components/forms/FormField'
import { useDispatch } from "react-redux";
import { insertAdminData } from "store/Admin/reducer"; 
import ApiRoutes from "constants/routes/api"
import PageRoutes from "constants/routes/pages";
import {useRouter} from "next/router";
import Cookies from "universal-cookie"
import axios from "axios";
import { Formik, Form } from 'formik'
import {useSelector} from "react-redux";
import * as Yup from "yup"
import { toast } from "react-toastify";
import Logo from 'assets/Logo.png'

const validationSchema = Yup.object({
	"email": Yup.string()
		.email("Por favor, ingrese un email valido.")
		.required("Este campo es obligatorio."),
	"password": Yup.string()
		.required("Este campo es obligatorio.")
})

export default function LoginForm(){

	const dispatch = useDispatch();
	const { push } = useRouter();
	const cookies = new Cookies();
	const data = useSelector(state => { return state});
	const [loading, setLoading] = useState(false)

	const initialValues = {
		"email": "",
		"password": "",
	}

	const onSubmit = async (values) => {
		setLoading(true)
		axios.post(ApiRoutes.admin.login, values,  { headers: {'Content-Type': 'application/json'} })
			.then((response) => {
				cookies.set("tokenAdmin", response.data.token, { path: '/' });
				dispatch(insertAdminData({data: response.data.message, token: response.data.token}))
				setLoading(false)
				push(PageRoutes.admin.dashboard);
			}).catch((error) => {
				toast.error("Email o contraseña incorrectos.", {
					position: toast.POSITION.TOP_RIGHT
				});
				setLoading(false)
			})
    setLoading(false)
	}

	return(
		<div className="flex flex-row justify-center md:drop-shadow-lg">
			<div className="bg-white h-screen md:w-110.5 md:h-125 w-full md:rounded-xl flex flex-col justify-between md:gap-0">
				<div className=" px-9 pb-6 flex justify-center h-full gap-10 flex-col">
					<div className="flex gap-3 justify-center items-center flex-col">
            <Image src={Logo} width={195} height={52} alt={"Cameya Logo"} />
            <h1 className="font-bold text-3xl text-center">Log In to Control Panel</h1>
          </div>
					<div>
            <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
              {
                ({values, errors})=>(
                  <Form>
                    <div className="flex flex-col gap-4">
                      <FormField
                        name="email"
                        placeholder="john@doe.com"/>
                      <FormField
                        name="password"
                        type="password"
                        placeholder="password"/>
                      <Button
                        loading={loading}
                        type="submit">
                          LOG IN
                      </Button>
                    </div>
                  </Form>
                )
              }
            </Formik>
          </div>
				</div>
			</div>
		</div>
	)
}