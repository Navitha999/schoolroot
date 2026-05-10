async function test() {
    try {
        console.log('Testing POST /addSchool...');
        const addRes = await fetch('http://localhost:3000/addSchool', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'DEF School',
                address: 'Mumbai',
                latitude: 19.0760,
                longitude: 72.8777
            })
        });
        const addData = await addRes.json();
        console.log('Add School Response:', addData);

        console.log('\nTesting GET /listSchools...');
        const listRes = await fetch('http://localhost:3000/listSchools?latitude=28.6139&longitude=77.2090');
        const listData = await listRes.json();
        console.log('List Schools Response:', listData);
    } catch (e) {
        console.error(e);
    }
}
test();
