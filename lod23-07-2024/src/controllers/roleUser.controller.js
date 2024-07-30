const path = require('path');
const fs = require('fs');
const {partner_role,personal_role, getroleUserView2,insert_role,vechile_role,assestFixed, expenses_estimation, income_tax, gstReturns, business_role, infra_role, tdsRole, bdplRole,bankRole} = require("../models/user_role/user_role");

const roleUserView1 = async (req, res) => {
    res.render('roleuser/roleuser1');
};
const roleUserView2 = async (req, res) => {
    console.log(req.cookies);
    const email = req.cookies.email;
    console.log(`Email from cookie: ${email}`);
    const result = await getroleUserView2(email);
    // console.log(result);
    res.render('roleuser/roleuser2',{data:result});
};
const roleUserView3 = async (req, res) => {
    res.render('roleuser/roleuser3');
};
const roleUserView4 = async (req, res) => {
    res.render('roleuser/roleuser4');
};
const roleUserView5 = async (req, res) => {
    res.render('roleuser/roleuser5');
};
const roleUserView6 = async (req, res) => {
    res.render('roleuser/roleuser6');
};
const roleUserView7 = async (req, res) => {
    res.render('roleuser/roleuser7');
};
const roleUserView8 = async (req, res) => {
    res.render('roleuser/roleuser8');
};
const roleUserView9 = async (req, res) => {
    res.render('roleuser/roleuser9');
};

const uploadDir = path.join(__dirname, '../../uploads/');


// function generateShortUniqueCode() {
//     const now = new Date();
    
//     const year = now.getFullYear().toString().slice(-2); 
//     const month = String(now.getMonth() + 1).padStart(2, '0');
//     const day = String(now.getDate()).padStart(2, '0');
//     const hours = String(now.getHours()).padStart(2, '0');
//     const minutes = String(now.getMinutes()).padStart(2, '0');
//     const seconds = String(now.getSeconds()).padStart(2, '0');
//     const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
//     const potentialCode = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    
//     const randomComponent = Math.floor(Math.random() * 10000); 
    
//     const uniqueCode = `${potentialCode}${randomComponent}`.slice(0, 14);
    
//     return uniqueCode;
// }


const roleUserInsert1 = async(req,res)=>{
    const email = req.cookies.email;
    console.log(`Email from cookie: ${email}`);
    console.log(req.body,".........................................");
    const files = req.files;

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePaths = {};

    for (let key in files) {
        if (Object.hasOwnProperty.call(files, key)) {
                const uploadedFile = files[key];
                if (!uploadedFile || !uploadedFile.name) {
                    continue; 
                }
                const fileExtension = path.extname(uploadedFile.name);
                const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}${fileExtension}`;
                const uploadPath = path.join(uploadDir, fileName);

            await uploadedFile.mv(uploadPath);
            
            filePaths[key] = `/uploads/${fileName}`;
        }
    }

    const data = await personal_role(email,filePaths, req.body);
    const data1 = await partner_detail(email,filePaths,req.body);

}

const roleUserInsert2 = async(req,res)=>{
    console.log(req.cookies);
    const email = req.cookies.email;
    console.log(`Email from cookie: ${email}`);
    console.log(req.body,".........................................",req.files);
    const files = req.files;

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePaths = {};

    for (let key in files) {
        if (Object.hasOwnProperty.call(files, key)) {
                const uploadedFile = files[key];
                if (!uploadedFile || !uploadedFile.name) {
                    continue; 
                }
                const fileExtension = path.extname(uploadedFile.name);
                const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}${fileExtension}`;
                const uploadPath = path.join(uploadDir, fileName);

            await uploadedFile.mv(uploadPath);
            
            filePaths[key] = `/uploads/${fileName}`;
        }
    }

    const data = await business_role(email,filePaths, req.body);
    res.redirect('/userrole/role3');
}

const roleUserInsert3 = async(req,res)=>{
    console.log(req.cookies);
    const email = req.cookies.email;
    console.log(`Email from cookie: ${email}`);
    console.log(req.body,".........................................",req.files);
    const files = req.files;

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePaths = {};

    for (let key in files) {
        if (Object.hasOwnProperty.call(files, key)) {
                const uploadedFile = files[key];
                if (!uploadedFile || !uploadedFile.name) {
                    continue; 
                }
                const fileExtension = path.extname(uploadedFile.name);
                const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}${fileExtension}`;
                const uploadPath = path.join(uploadDir, fileName);

            await uploadedFile.mv(uploadPath);
            
            filePaths[key] = `/uploads/${fileName}`;
        }
    }

    const data = await infra_role(email,filePaths, req.body);
    await vechile_role(req.files,req.body,email);
    await  assestFixed(req.body,email);
    res.redirect('/userrole/role4');
}

const roleUserInsert4 = async(req,res)=>{
    console.log(req.cookies);
    const email = req.cookies.email;
    console.log(`Email from cookie: ${email}`);
    console.log(req.body,".........................................",req.files);
    const files = req.files;

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePaths = {};

    for (let key in files) {
        if (Object.hasOwnProperty.call(files, key)) {
                const uploadedFile = files[key];
                if (!uploadedFile || !uploadedFile.name) {
                    continue; 
                }
                const fileExtension = path.extname(uploadedFile.name);
                const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}${fileExtension}`;
                const uploadPath = path.join(uploadDir, fileName);

            await uploadedFile.mv(uploadPath);
            
            filePaths[key] = `/uploads/${fileName}`;
        }
    }

    await expenses_estimation(req.body,email);
    res.redirect('/userrole/role5');
}

const roleUserInsert5 = async(req,res)=>{
    console.log(req.cookies);
    const email = req.cookies.email;
    console.log(`Email from cookie: ${email}`);
    console.log(req.body,".........................................",req.files);
    const files = req.files;

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePaths = {};

    for (let key in files) {
        if (Object.hasOwnProperty.call(files, key)) {
                const uploadedFile = files[key];
                if (!uploadedFile || !uploadedFile.name) {
                    continue; 
                }
                const fileExtension = path.extname(uploadedFile.name);
                const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}${fileExtension}`;
                const uploadPath = path.join(uploadDir, fileName);

            await uploadedFile.mv(uploadPath);
            
            filePaths[key] = `/uploads/${fileName}`;
        }
    }
    await tdsRole(filePaths,req.body,email);
    res.redirect('/userrole/role6');
}

const roleUserInsert6 = async(req,res)=>{
    console.log(req.cookies);
    const email = req.cookies.email;
    console.log(`Email from cookie: ${email}`);
    console.log(req.body,".........................................",req.files);
    const files = req.files;

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePaths = {};

    for (let key in files) {
        if (Object.hasOwnProperty.call(files, key)) {
                const uploadedFile = files[key];
                if (!uploadedFile || !uploadedFile.name) {
                    continue; 
                }
                const fileExtension = path.extname(uploadedFile.name);
                const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}${fileExtension}`;
                const uploadPath = path.join(uploadDir, fileName);

            await uploadedFile.mv(uploadPath);
            
            filePaths[key] = `/uploads/${fileName}`;
        }
    }
    const data = await bdplRole(filePaths,email,req.body);
    res.redirect('/userrole/role7');
}


const roleUserInsert7 = async(req,res)=>{
    console.log(req.cookies);
    const email = req.cookies.email;
    console.log(`Email from cookie: ${email}`);
    console.log(req.body,".........................................",req.files);
    const files = req.files;

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePaths = {};

    for (let key in files) {
        if (Object.hasOwnProperty.call(files, key)) {
                const uploadedFile = files[key];
                if (!uploadedFile || !uploadedFile.name) {
                    continue; 
                }
                const fileExtension = path.extname(uploadedFile.name);
                const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}${fileExtension}`;
                const uploadPath = path.join(uploadDir, fileName);

            await uploadedFile.mv(uploadPath);
            
            filePaths[key] = `/uploads/${fileName}`;
        }
    }
    const data = await income_tax(filePaths,email);
    res.redirect('/userrole/role8');

}

const roleUserInsert8 = async(req,res)=>{
    console.log(req.cookies);
    const email = req.cookies.email;
    console.log(`Email from cookie: ${email}`);
    console.log(req.body,".........................................",req.files);
    const files = req.files;

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePaths = {};

    for (let key in files) {
        if (Object.hasOwnProperty.call(files, key)) {
                const uploadedFile = files[key];
                if (!uploadedFile || !uploadedFile.name) {
                    continue; 
                }
                const fileExtension = path.extname(uploadedFile.name);
                const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}${fileExtension}`;
                const uploadPath = path.join(uploadDir, fileName);

            await uploadedFile.mv(uploadPath);
            
            filePaths[key] = `/uploads/${fileName}`;
        }
    }
    const data = await gstReturns(filePaths,email);
    res.redirect('/userrole/role9');
}

const roleUserInsert9 = async(req,res)=>{
    console.log(req.cookies);
    const email = req.cookies.email;
    console.log(`Email from cookie: ${email}`);
    console.log(req.body,".........................................",req.files);
    const files = req.files;

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePaths = {};

    for (let key in files) {
        if (Object.hasOwnProperty.call(files, key)) {
                const uploadedFile = files[key];
                if (!uploadedFile || !uploadedFile.name) {
                    continue; 
                }
                const fileExtension = path.extname(uploadedFile.name);
                const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}${fileExtension}`;
                const uploadPath = path.join(uploadDir, fileName);

            await uploadedFile.mv(uploadPath);
            
            filePaths[key] = `/uploads/${fileName}`;
        }
    }
    const data = await bankRole(email,req.body,filePaths);

}
module.exports = { roleUserView1,roleUserView2,roleUserView3,roleUserView4,roleUserView5,roleUserView6,roleUserView7,roleUserView8,roleUserView9, roleUserInsert1, roleUserInsert2,roleUserInsert3,roleUserInsert4,roleUserInsert5,roleUserInsert6,roleUserInsert7,roleUserInsert8,roleUserInsert9};
