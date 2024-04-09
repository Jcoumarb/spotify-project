import React, { useState } from "react";
import { Image, Carousel, Form, Input, Button , Card} from 'antd';


export default function App() {
	const [tracks, setTracks] = useState([]);	//used to keep track of current tracks

	//This runs when the form is submitted and updates the usestates whose fields will be used to fetch data
	const handleFormSubmit = async (values) => {
		//setSearchTerm(values.searchTerm);
		//setLimit(values.limit);

		const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';
		const url = `${baseURL}?q=${values.searchTerm}&type=track&limit=${values.limit}`;
		console.log(url);
		const response = await fetch(url);
		const data = await response.json();

		setTracks(data);
		console.log(data);
	};

	return (
        	<>
            		<header>
                		<h1>Spotify Carousel</h1>
            		</header>
            		
			<main>
                		<Form onFinish={handleFormSubmit} layout="vertical" labelAlign="left" style={{ flexDirection: 'column', display: 'flex', alignItems: 'center', height: '30vh'}}>
					<Form.Item label="Search Term:" name="searchTerm" rules={[{ required: true, message: 'Please input a search term' }]}>
						<Input />
					</Form.Item>
					<Form.Item label="Limit:" name="limit" rules={[{ required: true, message: 'Please input a limit' }]}>
						<Input type="number" min={1} max={20} />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">Submit</Button>
					</Form.Item>	
				</Form>

				<div style={{ marginTop: '20px' }}>
					<Carousel>
						{tracks.map(track => (
							<div key={track.id}>
								<iframe title={track.name}  src={`https://open.spotify.com/embed/track/${track.id}`} width="auto" height="auto" frameBorder="0" allowtransparency="true" allow="encrypted-media"  style={{display: 'block', margin: '0 auto'}}/>	
							</div>
						))}
					</Carousel>
				</div>
            		</main>
        	</>
    	);
}
