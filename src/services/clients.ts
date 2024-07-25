import { Client } from "@model/users";

class ClientService {
    private clients: Client[];

    constructor(initialClients: Client[]) {
        this.clients = initialClients;
    }

    getAll(): Client[] {
        return this.clients;
    }

    findClientById(id: string): Client | undefined {
        return this.clients.find(c => c.id === id);
    }

    updateClient(id: string, data: Client): void {

    }

}

export default ClientService;