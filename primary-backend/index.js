import {SpheronClient, PersistentStorageClassEnum} from "@spheron/compute";
import { ComputeTypeEnum } from "@spheron/core";
import express from 'express';

import dotenv from 'dotenv';

dotenv.config();

const token = process.env.SPHERON_API_TOKEN;

async function createSpheronInstance() {
  try {
    // Initialize Spheron Client
    const spheron = new SpheronClient({ token });

    // Define instance configuration
    const instanceConfig = {
      clusterName: "hello world",
      configuration: {
        image: "giri8spheron/php-example",
        tag: "latest",
        ports: [{ containerPort: 8000, exposedPort: 8000 }],
        environmentVariables: [],
        secretEnvironmentVariables: [],
        commands: [],
        args: [],
        region: "any",
        replicas: 1,
        persistentStorage: {
          size: 20,
          class: PersistentStorageClassEnum.HDD,
          mountPoint: "/etc/data"
        },
        customSpecs: {
          cpu: 1,
          memory: 2
        }
      },
      healthCheckConfig: {
        path: "/",
        port: 8000
      },
      type: ComputeTypeEnum.SPOT
    };

    // Create the instance
    const instanceResponse = await spheron.instance.create(instanceConfig);

    // Handle the response (e.g., log the instance ID)
    console.log('Instance created with ID:', instanceResponse.instanceId);
  } catch (error) {
    // Error handling
    console.error('Error creating instance:', error.message);
  }
}

createSpheronInstance();

const client = new SpheronClient({ token });

// const instanceResponse=
//   await client.instance.create({
//   clusterName: "hello world",
//   configuration: {
//     image: "giri8spheron/php-example",
//     tag: "latest",
//     ports: [{ containerPort: 8000, exposedPort: 8000 }],
//     environmentVariables: [],
//     secretEnvironmentVariables: [],
//     commands: [],
//     args: [],
//     region: "any",
//     replicas: 1,
//     // machineImageId: ventusSmallId
//     // persistentStorage: {
//     //   size: 10,
//     //   class: PersistentStorageClassEnum.HDD,
//     //   mountPoint: "/etc/data"
//     // },
//   },
//   healthCheckConfig: {
//     path: "/",
//     port: 8000
//   },
//   // type: "demand"
// });