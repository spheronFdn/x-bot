// import axios from 'axios';

// // Using your actual API key
// const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiIwYzllYmVjZjQxYThiODIzZmRmODdiNjRjODg2MjQzYWE1NjQ2Nzg5YWU4MGQ1Y2IxZjg1NjQ3NTBjYjEzZDAwODUyODZhYzAzYzA3MzRlMWUwODY1ZmJmNDlkZmZhYmYxNGRjMTJhYjRmNTFhMTRjZmM4YzY2NWY3YmQ5OWIyYyIsInR5cGUiOjAsImlhdCI6MTcwMjMwMTkwNCwiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.TL0rHFaSIijmjBmcCB1ivhPT1uxlpq9LBb5GQ5G4RKI';

// let instanceId;

// // Updated payload based on your details
// const payload = {
//   uniqueTopicId: "9833ft5d-1c63-492a-bca0-35269582a5e1",
//   healthCheckUrl: "",
//   healthCheckPort: "",
//   clusterName: "primary-backend",
//   clusterProvider: "DOCKERHUB",
//   clusterUrl: "giri8spheron/php-example",
//   configuration: {
//     // akashMachineImageName: "Ventus Small",
//     command: [],
//     args: [],
//     env: [
//     //   { value: "API_KEY=123456789", isSecret: true }
//     ],
//     image: "giri8spheron/php-example",
//     tag: "latest",
//     ports: [{ containerPort: "80", exposedPort: "80" }],
//     protocol: "akash",
//     instanceCount: 1,
//     region: "eu-east",
//     scalable: true,
//     customInstanceSpecs: {
//       cpu: "1",
//       memory: "2",
//       storage: "4Gi",
//     }
//   },
//   scalable: true,
//   organizationId: "6511b2233ef7c60012deaa5a"
// };

// // Using the provided base URL
// const url = 'https://api-v2.spheron.network/v1/cluster-instance/create';

// async function closeInstance(instanceId) {
//     const apiUrl = `https://api-v2.spheron.network/v1/cluster-instance/${instanceId}/close`;
//     const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

//     try {
//         const response = await axios.post(apiUrl, {}, {
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`,
//                 'Content-Type': 'application/json'
//             }
//         });
//         console.log(`Instance ${instanceId} closed successfully.`);
//     } catch (error) {
//         console.error(`Error closing instance ${instanceId}:`, error.response ? error.response.data : error.message);
//     }
// }
// // Function to make the POST request
// const createClusterInstance = async () => {
//   try {
//     const response = await axios.post(url, payload, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${apiKey}`
//       }
//     });

//     console.log('Response:', response.data);
//     instanceId =response.data.clusterInstanceId;
//   } catch (error) {
//     console.error('Error:', error.response ? error.response.data : error.message);
//   }
// };

// app.post('/task-completed', async (req, res) => {
//     console.log('Task completion signal received.');
//     await deleteInstance();
//     setTimeout(createInstance, 300000); // 5 minutes in milliseconds
// });

// // Run the function
// createClusterInstance();

import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

let instanceId;

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiIwYzllYmVjZjQxYThiODIzZmRmODdiNjRjODg2MjQzYWE1NjQ2Nzg5YWU4MGQ1Y2IxZjg1NjQ3NTBjYjEzZDAwODUyODZhYzAzYzA3MzRlMWUwODY1ZmJmNDlkZmZhYmYxNGRjMTJhYjRmNTFhMTRjZmM4YzY2NWY3YmQ5OWIyYyIsInR5cGUiOjAsImlhdCI6MTcwMjMwMTkwNCwiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.TL0rHFaSIijmjBmcCB1ivhPT1uxlpq9LBb5GQ5G4RKI'; // Replace with your actual API key

async function createInstance() {
    console.log('Creating a new instance...');

    const payload = {
          uniqueTopicId: "9833ft5d-1c63-492a-bca0-35269582a5e1",
          healthCheckUrl: "",
          healthCheckPort: "",
          clusterName: "python-backend",
          clusterProvider: "DOCKERHUB",
          clusterUrl: "giri8spheron/pythonbackend",
          configuration: {
            akashMachineImageName: "Ventus Small",
            command: [],
            args: [],
            env: [
            //   { value: "API_KEY=123456789", isSecret: true }
            ],
            image: "giri8spheron/pythonbackend",
            tag: "latest",
            ports: [{ containerPort: "8000", exposedPort: "80" }],
            protocol: "akash",
            instanceCount: 1,
            region: "eu-east",
            scalable: true,
            customInstanceSpecs: {
            //   cpu: "1",
            //   memory: "2",
              storage: "20Gi",
            }
          },
          scalable: true,
          organizationId: "6511b2233ef7c60012deaa5a"
        };

    try {
        const response = await axios.post('https://api-v2.spheron.network/v1/cluster-instance/create', payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        console.log('Response:', response.data);
        instanceId = response.data.clusterInstanceId;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

async function deleteInstance() {
    if (!instanceId) {
        console.log("No instance ID available to delete.");
        return;
    }

    console.log(`Deleting instance ${instanceId}`);
    const apiUrl = `https://api-v2.spheron.network/v1/cluster-instance/${instanceId}/close`;

    try {
        await axios.post(apiUrl, {}, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(`Instance ${instanceId} closed successfully.`);
    } catch (error) {
        console.error(`Error closing instance ${instanceId}:`, error.response ? error.response.data : error.message);
    }
}

app.post('/task-completed', async (req, res) => {
    console.log('Task completion signal received.');
    await deleteInstance();
    setTimeout(createInstance, 300000); // 5 minutes in milliseconds
});

app.listen(8000, () => {
    console.log('Server started on port 8000');
    createInstance();
});
