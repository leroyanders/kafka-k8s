# Kafka and Kafdrop Setup

This guide explains how to set up Apache Kafka and Kafdrop using Kubernetes or Docker Compose, and how to run your application.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Node.js](https://nodejs.org/) (for running your application)
- [npm](https://www.npmjs.com/get-npm) (for installing dependencies)

---

## Installation

### 1. Install Dependencies

Install the required dependencies for your application:

```bash
npm install
```

### 2. Run Kafka and Kafdrop

You can use either Kubernetes or Docker Compose to run Kafka and Kafdrop.

#### Option 1: Using Kubernetes

Apply the Kubernetes manifests:

```bash
kubectl apply -f k8s/
```

Verify that the pods are running:

```bash
kubectl get pods
```

Forward the ports to access Kafka and Kafdrop locally:

```bash
kubectl port-forward svc/kafka-broker 9092:9092
kubectl port-forward svc/kafdrop 9000:9000
```

#### Option 2: Using Docker Compose

Start the services using Docker Compose:

```bash
docker-compose up -d
```

Verify that the containers are running:

```bash
docker-compose ps
```

### 3. Access Kafka and Kafdrop

- Kafka will be available at `localhost:9092`.
- Kafdrop (Kafka UI) will be available at [http://localhost:9000](http://localhost:9000).

### 4. Run Your Application

Once Kafka and Kafdrop are running, start your application:

```bash
npm run start
```

## Troubleshooting

### Kafka Not Responding

Ensure Kafka is running and the ports are forwarded correctly.

Check the logs for errors:

Using Kubernetes:
```bash
kubectl logs <kafka-pod-name>
```

or

Using Docker Compose:
```bash
docker-compose logs kafka-broker
```

### Kafdrop Not Accessible

Ensure Kafdrop is running and port 9000 is forwarded.

Check the logs for errors:

Using Kubernetes:
```bash
kubectl logs <kafdrop-pod-name>
```

or

Using Docker Compose:
```bash
docker-compose logs kafdrop
```

## Cleanup

### Kubernetes

To delete Kubernetes resources:

```bash
kubectl delete -f k8s/
```

### Docker Compose

To stop and remove Docker containers:

```bash
docker-compose down
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
