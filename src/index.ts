import express, {Application, Request, Response, NextFunction} from "express";

const app: Application = express();
const PORT: number = 4000;

app.use("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({message: "Hello World"})
});

app.listen(PORT, () => console.log(`server listening on ${PORT}`));