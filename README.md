Branch Details API

URL : host:port/api/branch?ifsc=somecode&bank_name=ICICI&city=Bangalore

Returned JSON : {
	branches: [{
		ifsc: '',
		bank_id: '',
		branch: '',
		address: ',
		city: '',
		district: '',
		state: '',
		bank_name: ''
	}, success: true]
}

To setup DB, execute the following in shell:
	psql -U <user_name> -d sample_db -c 'create database sample_db'
	psql -U <user_name> -d sample_db < scripts/indian_banks.sql