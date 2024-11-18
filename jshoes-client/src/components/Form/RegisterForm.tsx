import React from "react";
import { StyledButton } from "../CustomComponents/BasicComponents";
import { StyledTextarea } from "../CustomComponents/FormComponents";
import { Box, Typography } from "@mui/material";
import validationSchema from "./validationSchema";
import { useFormik } from "formik";

const RegisterForm: React.FC = () => {
	const formik = useFormik({
		initialValues: {
			email: "",
			username: "",
			password: "",
			re_password: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.table(values);
		}
	})

	return (
		<form onSubmit={formik.handleSubmit}>
			<Box display="flex" flexDirection="column" gap={2}>
				<Typography 
			</Box>
		</form>
	)
}