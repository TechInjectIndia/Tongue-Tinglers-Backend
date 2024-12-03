import { exec } from "child_process"

export const migrate = (req, res) => {
    exec('npx sequelize-cli db:migrate', (error, stdout, stderr) => {
    console.log(stderr);
    console.log(stdout);
        if(error){
            console.error(`Error: ${stderr}`);
            return res.status(500).send({ message: 'Migration failed', error: stderr });
        }
        console.log(`Success: ${stdout}`);
        res.send({ message: 'Migration successful', output: stdout });
    })
}