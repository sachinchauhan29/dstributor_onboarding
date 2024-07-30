const dbconn = require("../../config/db");
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../../uploads/');


const insert_role = async (filePaths, data, distributor_code,bankRole) => {
    const {     
       
        radio_tds,
        tds_deducted,
        number_tan,
        upload_tan_certificate,
        upload_tds_bill_declaration,
        radio_bdpl,
        radio_deducted_bdpl,
        radio_bank_account,
        bank_account_od
    } = data;   
    
    const query = `
        INSERT INTO distributor_informations (
            tds_Declaration,
            tds_deducted,
            tan_number,
            tan_certificate,
            tds_bill_declaration,
            purchase_bdpl,
            deducted_bdpl,
            distributor_bank_account,
            distributor_bank_account_od
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const values = [
        
        radio_tds,
        tds_deducted,
        number_tan,
        filePaths.upload_tan_certificate||'',
        filePaths.upload_tds_bill_declaration||'',
        radio_bdpl,
        radio_deducted_bdpl,
        radio_bank_account,
        bank_account_od
    ];

    return new Promise((resolve, reject) => {
        dbconn.query(query, values, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};



const vechile_role = async (files, data, email) => {

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePaths = {};

    for (let key in files) {

        if (Object.hasOwnProperty.call(files, key)) {
            const uploadedFiles = files[key];

            if (!Array.isArray(uploadedFiles)) {
                continue;
            }

            if (!Array.isArray(uploadedFiles)) {
                uploadedFiles = [uploadedFiles];
            }

            filePaths[key] = [];

            for (let uploadedFile of uploadedFiles) {
                if (!uploadedFile || !uploadedFile.name) {
                    continue;
                }

                const fileExtension = path.extname(uploadedFile.name);
                const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}${fileExtension}`;
                const uploadPath = path.join(uploadDir, fileName);

                await uploadedFile.mv(uploadPath);

                filePaths[key].push(`/uploads/${fileName}`);
            }
        }
    }
 

    const rcNumbers = data['rcNumber[]'] || [];
    const fleetVehicleSizes = data['fleetVehicleSize[]'] || [];
    const vehicleDetails = data['vehicleDetail[]'] || [];
    const vehicleOwnerships = data['vehicleOwnership[]'] || [];
    const rcBookPhotos = filePaths['rcBookPhoto[]'] || [];
    const vechilePhotos = filePaths['vehiclePhoto[]'] || [];

        let maxLength = 0;

        const updateMaxArray = (array) => {
            if (array.length > maxLength) {
                maxLength = array.length;
            }
        };

        updateMaxArray(rcNumbers);
        updateMaxArray(fleetVehicleSizes);
        updateMaxArray(vehicleDetails);
        updateMaxArray(vehicleOwnerships);
        updateMaxArray(rcBookPhotos);
        updateMaxArray(vechilePhotos);

    const insertPromises = [];
    
    for (let i = 0; i < maxLength; i++) {
        const query = `INSERT INTO vehicle_info (rcNumber, fleetVehicleSize, vehicleDetail, vehicleOwnership, rcBookPhoto, vehiclePhoto, distributor_code) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [rcNumbers[i], fleetVehicleSizes[i], vehicleDetails[i], vehicleOwnerships[i], rcBookPhotos[i], vechilePhotos[i], email];

        insertPromises.push(new Promise((resolve, reject) => {
            dbconn.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        }));
    }

    try {
        const results = await Promise.all(insertPromises);
        return results;
    } catch (error) {
        throw error;
    }
};


const  assestFixed = async (data,distributor_code) =>
{

    const fixed_assests = data['description_fixed_assestsl[]'] || [];
    const vehicleOwnedBys = data['vehicleOwnedBy[]'] || [];

        let maxLength = 0;

        const updateMaxArray = (array) => {
            if (array.length > maxLength) {
                maxLength = array.length;
            }
        };

        updateMaxArray(fixed_assests);
        updateMaxArray(vehicleOwnedBys);


    const insertPromises = [];

    for (let i = 0; i < maxLength; i++) {
        const query = `INSERT INTO fixed_assets (address, owned_by, distributor_code) VALUES (?, ?, ?)`;
        const values = [fixed_assests[i], vehicleOwnedBys[i], distributor_code];

        insertPromises.push(new Promise((resolve, reject) => {
            dbconn.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            });
        }));
    }

    try {
        const results = await Promise.all(insertPromises);
        return results;
    } catch (error) {
        throw error;
    }
}

const expenses_estimation = async (data, distributor_code) => {
    console.log(distributor_code);
    const query = `
        INSERT INTO Expenses_Estimation(
            turnover_month, rogt_sales, market_credit, stocks, vehicle_investment, 
            aaco_deposit_store, chest_cold, godown_deposit, claims_lca, outlet_covered, 
            salesman, salesman_salary, delivery_salary, driver, driver_salary, 
            data_entry, data_entry_person_salary, cashier, cashier_person_salary, 
            godown_helper, godown_helper_person_salary, monthly_expenses, rent_expenses, 
            electricity_exp, delivery_van, internet_broadband, office_telephone, 
            office_expenses, monthly_audit, monthly_unloading, bank_cheque, distributor_code
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        data.turnover_month, data.rogt_sales, data.market_credit, data.stocks, data.vehicle_investment, 
        data.aaco_deposit_store, data.chest_cold, data.godown_deposit, data.claims_lca, data.outlet_covered, 
        data.salesman, data.salesman_salary, data.delivery_salary, data.driver, data.driver_salary, 
        data.data_entry, data.data_entry_person_salary, data.cashier, data.cashier_person_salary, 
        data.godown_helper, data.godown_helper_person_salary, data.monthly_expenses, data.rent_expenses, 
        data.electricity_exp, data.delivery_van, data.internet_broadband, data.office_telephone, 
        data.office_expenses, data.monthly_audit, data.monthly_unloading, data.bank_cheque, distributor_code
    ];

    return new Promise((resolve, reject) => {
        dbconn.query(query, values, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};


const income_tax = async (data,distributor_code)=>{

    console.log("................................................................",data);
    const query = `insert into distributor_income_tax(distributor_code, provide_ity_file, provide_itr_file) VALUES(?, ?, ?)`;

    const values = [
        distributor_code, data.provide_ity_file||'', data.provide_itr_file||''
    ];

    return new Promise((resolve, reject) => {
        dbconn.query(query, values, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};

const gstReturns = (files,distributor_code)=>{
    console.log(files);
    const query = `insert into gstr_returns(distributor_code,gst_3b,gst_3b_upload,gstr_3b_quarterly,gstr_3b_monthly,gstr_3b_hare,gst_march,gst_april,
    gst_may,gst_june,gst_july,gst_august,gst_sep,gst_oct) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    
    const values = [
        distributor_code,files.gst_3b||'',
        files.gst_3b_upload||'',
        files.gstr_3b_quarterly||'',
        files.gstr_3b_monthly||'',
        files.gstr_3b_hare||'',
        files.gst_march||'',
        files.gst_april||'',
        files.gst_may||'',
        files.gst_june||'',
        files.gst_july||'',
        files.gst_august||'',
        files.gst_sep||'',
        files.gst_oct||''
    ];

    return new Promise((resolve, reject) => {
        dbconn.query(query, values, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};





const business_role = async (email, filePaths, data) => {
    console.log(data); 
    const {
        gst_number,
        gst_upload_img,
        shop_upload_img,
        panchayat_noc,
        udyam_certificate,
        nach_form,
        cancellled_cheque,
        fassi_reg,
        fssai_license_a,
        fssai_license_b,
        radio_fssai,
        business_start_date,
        fssai_valid_date,
        expiry_date,
        sister_concern,
        code_concern,
        business_pan,
        upload_business_pan,
        pan_card_letterhead,
        radio_ownership,
    } = data;

    const query = `
       UPDATE distributor_informations
        SET
            gst_number = ?,
            gst_registration_certificate = ?,
            shop_establishment_certificate = ?,
            shop_noc_document = ?,
            udyam_certificate = ?,
            nach_form = ?,
            cancelled_cheque = ?,
            fssai_registration_no = ?,
            fssai_certificate_A = ?,
            fssai_certificate_B = ?,
            business_start_date = ?,
            fssai_start_date = ?,
            fssai_expiry_date = ?,
            sister_concern_awl = ?,
            codeof_sister_awl = ?,
            business_pan_card = ?,
            business_pancard_image = ?,
            company_letterhead = ?,
            ownership_property = ?,
            fssai_type = ?
        WHERE distributor_email = ?
    `;

    const values = [
        gst_number,
        filePaths.gst_upload_img || '',
        filePaths.shop_upload_img || '',
        filePaths.panchayat_noc || '',
        filePaths.udyam_certificate || '',
        filePaths.nach_form || '',
        filePaths.cancellled_cheque || '',
        fassi_reg || '',
        filePaths.fssai_license_a || '',
        filePaths.fssai_license_b || '',
        business_start_date,
        fssai_valid_date,
        expiry_date,
        sister_concern,
        code_concern,
        business_pan,
        filePaths.upload_business_pan || '',
        filePaths.pan_card_letterhead || '',
        radio_ownership,
        radio_fssai,
        email
    ];

    return new Promise((resolve, reject) => {
        dbconn.query(query, values, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};


const infra_role = async (email, filePaths, data) => {
    console.log("infra role..........................................................................", email,"...........................",data);
    const {
        opening_time,
        closing_time,
        Manager_emp,
        Manager_emp_exclusive,
        salesmen_emp,
        driver_emp,
        driver_emp_exclusive,
        delivery_boys_emp,
        delivery_boys_emp_exclusive,
        Operator_emp,
        Operator_emp_exclusive,
        others_emp,
        others_emp_exclusive,
        external_brands,
        external_company,
        external_industry,
        external_noOfProducts,
        manager_area_of_opertaion,
        external_dsm_count,
        external_noOf_outlet_coverage,
        external_dsm_sfa,
        external_tenure_company,
        external_appx_cross,
        external_monthly_to,
        infra_radio_ownership,
        days_investment,
        Total_Godown_Space,
        Outlet_Coverage,
        Space_for_AWL,
        Unloading_Space,
        person_handle_business,
        managing_person_contact,
        facility_designation,
        Unloading_points,
        Availabilty_Pallets,
        handheld_device,
        facility_computer,
        facility_printer,
        billing_software,
        internet_connection,
        radio_adv_payment,
        Fixed_Assests,
        department,
        security_deposit,
        bank_guarantee,
        investment_owned,
        investment_borrowed,
    } = data;

    const query = `
        UPDATE distributor_informations 
        SET
            opening_time = ?,
            closing_time = ?,
            Manager_emp = ?,
            Manager_emp_exclusive = ?,
            salesmen_emp = ?,
            driver_emp = ?,
            driver_emp_exclusive = ?,
            delivery_boys_emp = ?,
            delivery_boys_emp_exclusive = ?,
            Operator_emp = ?,
            Operator_emp_exclusive = ?,
            others_emp = ?,
            others_emp_exclusive = ?,
            external_brands = ?,
            external_company = ?,
            external_industry = ?,
            external_noOfProducts = ?,
            manager_area_of_opertaion = ?,
            external_dsm_count = ?,
            external_noOf_outlet_coverage = ?,
            external_dsm_sfa = ?,
            external_tenure_company = ?,
            external_appx_cross = ?,
            external_monthly_to = ?,
            infra_ownership=?,
            days_investment=?,
            Total_Godown_Space=?,
            Outlet_Coverage=?,
            Space_for_AWL=?,
            Unloading_Space=?,
            person_handle_business=?,
            managing_person_contact=?,
            facility_designation=?,
            Unloading_points=?,
            Availabilty_Pallets=?,
            handheld_device=?,
            facility_computer=?,
            facility_printer=?,
            billing_software=?,
            internet_connection=?,
            radio_adv_payment=?,
            Fixed_Assets=?,
            department=?,
            security_deposit=?,
            bank_guarantee=?,
            investment_owned=?,
            investment_borrowed=?
        WHERE distributor_email = ?
    `;

    const values = [
        opening_time,
        closing_time,
        Manager_emp,
        Manager_emp_exclusive,
        salesmen_emp,
        driver_emp,
        driver_emp_exclusive,
        delivery_boys_emp,
        delivery_boys_emp_exclusive,
        Operator_emp,
        Operator_emp_exclusive,
        others_emp,
        others_emp_exclusive,
        external_brands,
        external_company,
        external_industry,
        external_noOfProducts,
        manager_area_of_opertaion,
        external_dsm_count,
        external_noOf_outlet_coverage,
        external_dsm_sfa,
        external_tenure_company,
        external_appx_cross,
        external_monthly_to,
        infra_radio_ownership,
        days_investment,
        Total_Godown_Space,
        Outlet_Coverage,
        Space_for_AWL,
        Unloading_Space,
        person_handle_business,
        managing_person_contact,
        facility_designation,
        Unloading_points,
        Availabilty_Pallets,
        handheld_device,
        facility_computer,
        facility_printer,
        billing_software,
        internet_connection,
        radio_adv_payment,
        Fixed_Assests,
        department,
        security_deposit,
        bank_guarantee,
        investment_owned,
        investment_borrowed,
        email
    ];

    return new Promise((resolve, reject) => {
        dbconn.query(query, values, (error, result) => {
            if (error) {
                return reject(error);
            }
            console.log(query,"...................",);
            return resolve(result);
        });
    });
};


const tdsRole = async (filePaths, data, email) => {
    const {          
        radio_tds,
        tds_deducted,
        number_tan,
    } = data;   
    
    const query = `
        UPDATE distributor_informations
        SET 
            tds_Declaration = ?,
            tds_deducted = ?,
            tan_number = ?,
            tan_certificate = ?,
            tds_bill_declaration = ?
        WHERE distributor_email = ?`;
    
    const values = [    
        radio_tds,
        tds_deducted,
        number_tan,
        filePaths.upload_tan_certificate || '',
        filePaths.upload_tds_bill_declaration || '',
        email
    ];

    return new Promise((resolve, reject) => {
        dbconn.query(query, values, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};




const bdplRole = async (filePaths, email, data) => {
    console.log(data);
    const {     
        radio_bdpl,
        radio_deducted_bdpl
    } = data;   
    
    const query = `
        UPDATE distributor_informations
        SET 
            purchase_bdpl = ?,
            deducted_bdpl = ?
        WHERE distributor_email = ?`;
    
    const values = [
        radio_bdpl,
        radio_deducted_bdpl,
        email
    ];

    return new Promise((resolve, reject) => {
        dbconn.query(query, values, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};


const bankRole = async (email,data,file) => {
    console.log(data,file);
    const {          
        radio_bank_account,
        bank_account_od,
        digital_bank_pdf
    } = data;   
    
    const query = `
        UPDATE distributor_informations 
        SET 
            distributor_bank_account = ?, 
            distributor_bank_account_od = ?, 
            digital_bank_pdf = ? 
        WHERE distributor_email = ?`;
    
    const values = [
        radio_bank_account,
        bank_account_od,
        file.digital_bank_pdf,
        email
    ];

    return new Promise((resolve, reject) => {
        dbconn.query(query, values, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};



const getroleUserView2 = async (email) => {
    const query = `SELECT * FROM distributor_informations WHERE distributor_email = ?`;
    const values = [email];

    return new Promise((resolve, reject) => {
        dbconn.query(query, values, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};



const partner_role = async (email, filePaths, data) => {
    console.log(data,"....................................",filePaths); 
    const {
        aadhar_number,
        aadhar_number_otp,
        personal_number,
        full_name,
        dob,
        personal_gender,
        father_name,
        address,
        pin_code,
        district_name,
        state_name
    } = data;

    const query = `
        UPDATE distributor_informations
        SET
            aadhar_number = ?,
            aadhar_number_otp = ?,
            personal_number = ?,
            full_name = ?,
            dob = ?,
            gender = ?,
            father_name = ?,
            address = ?,
            pin_code = ?,
            district_name = ?,
            state_name = ?,
            upload_addhar = ?,
            upload_addhar_back = ?,
            personal_pan_card = ?
        WHERE distributor_email = ?
    `;

    const values = [
        aadhar_number,
        aadhar_number_otp,
        personal_number,
        full_name,
        dob,
        personal_gender,
        father_name,
        address,
        pin_code,
        district_name,
        state_name,
        filePaths.upload_addhar,
        filePaths.upload_aadhar,
        filePaths.personal_pancard,
        email
    ];

    return new Promise((resolve, reject) => {
        dbconn.query(query, values, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};
const personal_role = async (email, filePaths, data) => {
    console.log(data,"....................................",filePaths); 
    const {
        aadhar_number,
        aadhar_number_otp,
        personal_number,
        full_name,
        dob,
        personal_gender,
        father_name,
        address,
        pin_code,
        district_name,
        state_name
    } = data;

    const query = `
        UPDATE distributor_informations
        SET
            aadhar_number = ?,
            aadhar_number_otp = ?,
            personal_number = ?,
            full_name = ?,
            dob = ?,
            gender = ?,
            father_name = ?,
            address = ?,
            pin_code = ?,
            district_name = ?,
            state_name = ?,
            upload_addhar = ?,
            upload_addhar_back = ?,
            personal_pan_card = ?
        WHERE distributor_email = ?
    `;

    const values = [
        aadhar_number,
        aadhar_number_otp,
        personal_number,
        full_name,
        dob,
        personal_gender,
        father_name,
        address,
        pin_code,
        district_name,
        state_name,
        filePaths.upload_addhar,
        filePaths.upload_aadhar,
        filePaths.personal_pancard,
        email
    ];

    return new Promise((resolve, reject) => {
        dbconn.query(query, values, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};


module.exports = {
    insert_role,
    vechile_role,
    assestFixed,
    expenses_estimation,
    income_tax,
    gstReturns,
    business_role,
    infra_role,
    tdsRole,
    bdplRole,
    bankRole,
    getroleUserView2,
    personal_role,
    partner_role
};