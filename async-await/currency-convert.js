// API fixer.io currency ratios, key = "64ffc8580e6d2f9867721202ad1f52ce";

// API restcountries.eu data about countries

const axios = require('axios');

// 1st version
/*
const getExchangeRate = (from, to) => {
    return axios.get('http://data.fixer.io/api/latest?access_key=64ffc8580e6d2f9867721202ad1f52ce').then((response) => {
        const euro = 1 / response.data.rates[from]; // value in €
        const rate = euro * response.data.rates[to]; 
        return rate;
    });
};
*/

// 2n version with async - await and try - catch
const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=64ffc8580e6d2f9867721202ad1f52ce');
        const euro = 1 / response.data.rates[from]; // value in €
        const rate = euro * response.data.rates[to]; 
        if (isNaN(rate)) {
            throw new Error();
        }
        return rate;
    } catch (e) {
        throw new Error(`Unable to get exchange trante for ${from} and ${to}`);
    }
};

// 1st version
/*
const getCountries = (currencyCode) => {
    return axios.get(`http://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
        return response.data.map((country) => country.name);
    });
};
*/

// 2n version with async - await and try - catch
const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`http://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);    
    } catch (e) {
        throw new Error (`Unable to get countries that use ${currencyCode}`);
    }
};

// 1st version
/*
const convertCurrency = (from, to, amount) => {
    let convertedAmount;
    return getExchangeRate(from, to).then((rate) => {
        convertedAmount = (amount * rate).toFixed(2); // 2 decimals
        return getCountries(to);
    }).then((countries) => {
        return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
    });
} 
*/

// 2n version with async - await
/*
const convertCurrency = async (from, to, amount) => {
    let rate = await getExchangeRate(from, to);
    let countries = await getCountries(to);
    let convertedAmount = (amount * rate).toFixed(2);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;   
}
*/

// 3rd versiuon with try - catch
const convertCurrency = async (from, to, amount) => {
    let rate = await getExchangeRate(from, to);
    let countries = await getCountries(to);
    let convertedAmount = (amount * rate).toFixed(2);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`; 
}


/*
getExchangeRate('USD', 'CAD').then((rate) => {
    console.log(rate);
});

getCountries('EUR').then((countries) => {
    console.log(countries);
});
*/

convertCurrency('USD', 'EUR', 20).then((message) => {
    console.log(message);
}).catch((e) => {
    console.log(e.message);
});