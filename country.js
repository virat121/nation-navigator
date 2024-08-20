const countryName = new URLSearchParams(location.search).get('name');
const flagImg = document.querySelector('.country-details img');
const countryNameEle = document.querySelector('.country-details h1');
const nativeName = document.querySelector('.native-name');
const population = document.querySelector('.population');
const region = document.querySelector('.region');
const subRegion = document.querySelector('.sub-region');
const capital = document.querySelector('.capital');
const topLevelDomain = document.querySelector('.top-level-domain');
const currencies = document.querySelector('.currencies');
const languages = document.querySelector('.languages');
const borderCountries = document.querySelector('.border-countries');
const themeChanger = document.querySelector('.theme-changer');

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText`)
  .then((res) => res.json())
  .then(([country]) => {
    flagImg.src = country.flags.svg;
    countryNameEle.innerText = country.name.common;
    topLevelDomain.innerText = country.tld.join(', ');
    population.innerText = country.population.toLocaleString('en-IN');
    region.innerText = country.region;

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }

    if (country.subregion) {
      subRegion.innerText = country.subregion;
    }

    if (country.capital) {
      capital.innerText = country.capital?.[0];
    }

    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(', ');
    }

    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(', ');
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const borderCountryTag = document.createElement('a');
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;
            borderCountries.append(borderCountryTag);
          });
      });
    }
  });

themeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('dark-mode', document.body.classList.contains('dark'));
});

window.addEventListener('load', () => {
  const darkMode = localStorage.getItem('dark-mode');
  if (darkMode === 'true') {
    document.body.classList.add('dark');
  }
});
