export default function validation(data, type) {
    let error = [];
    if (type === "login") {
        const { username, password } = data;
        if (username.length < 5 || username.length > 16) {
            error.push("username must in 6 to 16 characters")
        }
        if (password.length < 5 || password.length > 32) {
            error.push("password must in 6 to 32 characters")
        }

    }
    if (type === "calendar") {
        const { title, phone, message, start } = data;
        if (title.length <= 0) {
            error.push("title must not empty")
        }
        if (Number(phone) === "NaN") {
            error.push("phone must be a number")

        } else {
            if (Math.ceil(Math.log10(phone)) < 9 || Math.ceil(Math.log10(phone)) > 11) {
                error.push("phone must in 10 or 11 characters")
            }
        }
        if (message <= 0) {
            error.push("message must not empty")
        }
        if (start.toString() <= 0) {
            error.push("date must not empty")
        }
        // else {
        //     if (start instanceof Date) {
        //         error.push("call date must be date, please select in the left")
        //     }
        // }

    }

    if (type === "useradd") {
        const { username, password, email } = data;
        if (username.length < 5 || username.length > 16) {
            error.push("username must in 6 to 16 characters")
        }
        if (password.length < 5 || password.length > 32) {
            error.push("password must in 6 to 32 characters")
        }
        if (email.length < 5) {
            error.push("Email should be at least 5 charcters long");
        } else {
            if (email.split("").filter(x => x === "@").length !== 1) {
                error.push("Email should contain a @");
            } else {
                if (email.indexOf(".") === -1) {
                    error.push("Email should contain at least one dot");
                }
            }

        }

    }
    if (type === "accountadd") {
        const { username, password, email, agentname, agentcode, expireddate } = data;
        if (username.length < 5 || username.length > 16) {
            error.push("username must in 6 to 16 characters")
        }
        if (password.length < 5 || password.length > 32) {
            error.push("password must in 6 to 32 characters")
        }
        if (email.length < 5) {
            error.push("Email should be at least 5 charcters long");
        } else {
            if (email.split("").filter(x => x === "@").length !== 1) {
                error.push("Email should contain a @");
            } else {
                if (email.indexOf(".") === -1) {
                    error.push("Email should contain at least one dot");
                }
            }

        }

        if (agentname.length < 5) {
            error.push("Agent name should be at least 5 charcters long");
        }


        if (agentcode.length < 5) {
            error.push("Agent Code should be at least 5 charcters long");
        }
        if (expireddate.toString() <= 0) {
            error.push("expireddate date must not empty")
        } else {
            if (expireddate instanceof Date) {
                error.push("call date must be date, please select in the left")
            }
        }

    }
    if (type === "accountedit") {
        const { password, agentname, agentcode, expireddate } = data;
        console.log(password.length)
        if (password.length < 5 || password.length > 32) {
            error.push("password must in 6 to 32 characters")
        }

        if (agentname.length < 5) {
            error.push("Agent name should be at least 5 charcters long");
        }

        if (agentcode.length < 5) {
            error.push("Agent Code should be at least 5 charcters long");
        }
        console.log(expireddate instanceof Date)
        if (expireddate.toString() <= 0) {
            error.push("expireddate date must not empty")
        } else {
            if (!expireddate instanceof Date) {
                error.push("expired date must be date")
            }
        }
    }
    if (type === "changepassword") {
        const { oldpassword, newpassword, confirmpassword } = data;
        if (oldpassword.length < 5 || oldpassword.length > 32) {
            error.push("old password must in 6 to 32 characters")
        }
        if (newpassword.length < 5 || newpassword.length > 32) {
            error.push("new password must in 6 to 32 characters")
        }
        if (confirmpassword.length < 5 || confirmpassword.length > 32) {
            error.push("confirm password must in 6 to 32 characters")
        } else {
            if (newpassword !== confirmpassword) {
                error.push("new password not equal confirm password")
            }
        }
    }
    return error
}