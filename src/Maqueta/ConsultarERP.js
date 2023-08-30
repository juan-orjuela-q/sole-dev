
const authApiUrl = 'https://sincoerp.constructoracolpatria.com:7850/SincoConsColpatria/V3/API/Auth/Usuario';

async function obtenerUnidadesPorProyecto(idProyecto) {
    
    const unidadesApiUrl = `https://sincoerp.constructoracolpatria.com:7850/SincoConsColpatria/V3/CBRClientes/API/Unidades/PorProyecto/${idProyecto}`;

    const authRequestBody = {
        NomUsuario: 'office',
        ClaveUsuario: 'tZkIp9BN/YPmP35oetgP0ohbm6WqRVkVpieo8Uz1vEumssFXCkrb2A5kJxQAUTeyK6umtYZeRlajCZQjJBpEGChHJGSw4IFnUVkNKaip6IxyjGxrsLlpE1C7Kp043UIQqOL/ZExXSqWmYj9yGurceZfoRJvc73NBdqd6bPfuIVbmt9VcOhlZlZR1Jyqk/2LGBs2HQAF0Xa6gXWFzBeR/HAFPauFJ1kMCfeuT9t6tSpvZrshHwVTFdpMi9B2B3x4qNRCpEIxSU2eAK+IPWN0lFcqrldp0AdfdjmhgA3t/v6RWFipeVUp2XF2WOW3VIf+lQrSidElbMsgUNxViZ7gTEtBUfyF1/ZXjpBKwqQeMMtyKbGnuRzlQZIjCvlP9L3TwjNDT9nmMTVQ9GZT/Io8EyA==7'
    };

    try {
        // Obtiene el access_token
        const authResponse = await fetch(authApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authRequestBody)
        });

        if (!authResponse.ok && authResponse.status !== 300) {
            throw new Error(`Error de autenticación: ${authResponse.status} - ${authResponse.statusText}`);
        }

        const authData = await authResponse.json();
        const access_token = authData.access_token;
        console.log('Access Token:', access_token);

        const unidadesResponse = await fetch(unidadesApiUrl, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });

        if (!unidadesResponse.ok) {
            throw new Error(`Unidades API Error: ${unidadesResponse.status} - ${unidadesResponse.statusText}`);
        }

        const unidadesData = await unidadesResponse.json();
        console.log('Unidades Data:', unidadesData);
        return unidadesData;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function obtenerProyectoPorMegaproyecto(idMegaProyecto) {

    const proyectosApiUrl = `https://sincoerp.constructoracolpatria.com:7850/SincoConsColpatria/V3/CBRClientes/Api/Proyectos/${idMegaProyecto}`;

    const authRequestBody = {
        NomUsuario: 'office',
        ClaveUsuario: 'tZkIp9BN/YPmP35oetgP0ohbm6WqRVkVpieo8Uz1vEumssFXCkrb2A5kJxQAUTeyK6umtYZeRlajCZQjJBpEGChHJGSw4IFnUVkNKaip6IxyjGxrsLlpE1C7Kp043UIQqOL/ZExXSqWmYj9yGurceZfoRJvc73NBdqd6bPfuIVbmt9VcOhlZlZR1Jyqk/2LGBs2HQAF0Xa6gXWFzBeR/HAFPauFJ1kMCfeuT9t6tSpvZrshHwVTFdpMi9B2B3x4qNRCpEIxSU2eAK+IPWN0lFcqrldp0AdfdjmhgA3t/v6RWFipeVUp2XF2WOW3VIf+lQrSidElbMsgUNxViZ7gTEtBUfyF1/ZXjpBKwqQeMMtyKbGnuRzlQZIjCvlP9L3TwjNDT9nmMTVQ9GZT/Io8EyA==7'
    };

    try {
        // Obtiene el access_token
        const authResponse = await fetch(authApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authRequestBody)
        });

        if (!authResponse.ok && authResponse.status !== 300) {
            throw new Error(`Error de autenticación: ${authResponse.status} - ${authResponse.statusText}`);
        }

        const authData = await authResponse.json();
        const access_token = authData.access_token;
        console.log('Access Token:', access_token);

        const proyectosResponse = await fetch(proyectosApiUrl, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });

        if (!proyectosResponse.ok) {
            throw new Error(`Unidades API Error: ${proyectosResponse.status} - ${proyectosResponse.statusText}`);
        }

        const proyectosData = await proyectosResponse.json();
        console.log('Proyectos Data:', proyectosData);
        return proyectosData;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

/*async function consumo() {
    const idProyecto = 512;
    const unidades = await obtenerUnidadesPorProyecto(idProyecto);
    console.log('unidades:', unidades);

    const idMegaProyecto = 340;
    const proyectos = await obtenerProyectoPorMegaproyecto(idMegaProyecto);
    console.log('Proyectos:', proyectos);
}

consumo();*/

export {obtenerUnidadesPorProyecto, obtenerProyectoPorMegaproyecto}