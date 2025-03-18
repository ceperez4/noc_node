interface checkServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements checkServiceUseCase {

    constructor(
        private readonly successCllback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ) {

    }

    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`)

            }
            this.successCllback();
            
            return true;
        } catch (error) {
            
            console.log(`${error}`)
            return false;
        }
    }
}