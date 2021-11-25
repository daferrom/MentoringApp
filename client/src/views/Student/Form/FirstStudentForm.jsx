import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Footer from '../../../components/Footer/Footer'
import Navbar from '../../../components/Navbar/Navbar'
import '../Form/FirstStudentForm.css';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const FirstStudentForm = () => {
	
	const [list, setList] = useState([]);

	let { id } = useParams();

	useEffect(() => {
	  Axios({
		url: `http://localhost:3001/api/formStudent/${id}`,
	  })
		.then((response) => {
		  setList(response.data);
		  // console.log(response.data);
		})
		.catch((error) => {
		  console.log(error);
		});
	}, [setList]);

    return (
        <div>
            <Navbar/>
			<p className="do">Las siguientes preguntas te ayudaran a ti a tu mentor en el desarrollo de la sesión.</p>
			<div className="advice">
				{list.map((item) => (
				<div class="mb-3" key={item.id}>
					<label for="exampleFormControlTextarea1" class="form-label">{item.question}</label>
					<br></br>
					<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
				</div>
				))}
			</div>
			 <Footer/>
        </div>
    )
}

export default FirstStudentForm
