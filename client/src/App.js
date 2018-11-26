import React, { useState, useEffect } from 'react';
import axios from 'axios';

const load = async () => axios.get('/api/me').then(({ data }) => data);

const App = () => {
	const [data, setData] = useState(null);
	useEffect(() => {
		load().then(data => setData(data));
	}, []);
	return <div style={{textAlign: 'center'}}>{!data ? 'No data yet!' : JSON.stringify(data, null, 2)}</div>;
};

export default App;
