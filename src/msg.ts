import puppeteer from "puppeteer";
import chalk from "chalk";

const log = console.log
const info = chalk.bold.greenBright
const warn = chalk.bold.red

type msgParams = {
    username: string,
    password: string,
    chat: string,
    message: string,
    repeat: number
}
export async function sendMessages(param: msgParams) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    log(info("Opening Instagram"));

    await page.goto("https://www.instagram.com/accounts/login/", {
        waitUntil: "networkidle0",
    });

    // Wait for log in form

    log(info("Waiting for Log-in Page"));

    await Promise.all([
        page.waitForSelector('[name="username"]'),
        page.waitForSelector('[name="password"]'),
    ]);

    // Enter username and password

    log(info("Filling in Username and Password"));

    await page.type('[name="username"]', param.username);
    await page.type('[name="password"]', param.password);

    // Submit log in credentials and wait for navigation
    log(info("Logging in...\n"));

    try {
        await Promise.all([
            page.click('[type="submit"]'),
            page.waitForNavigation({
                waitUntil: "networkidle0",
            }),
        ]);
    } catch (error) {
        throw new Error(warn("Login failed!!!"))
    }

    log(info("Opening ChatBox"));

    await page.goto(
        param.chat,
        { waitUntil: "networkidle0" }
    );

    log(info("Sending messages...\n"));

    await page.focus("textarea")

    for (var i = 0; i < param.repeat + 1; i++) {
        await page.keyboard.type(param.message);
        await page.keyboard.press("Enter");
    }
    log(chalk.bgRedBright.bold(`Messages sent: ${param.repeat}`));

    await browser.close();
}

