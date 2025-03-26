const title = document.querySelector(".service-name");
const video = document.getElementById("services_hero_video");
const description = document.querySelector(".service_description");
const serviceEffectsList = document.querySelector(".service_effects-list");
const serviceAdditivesList = document.querySelector(".services_additives_list");
const servicesPriceTableBody = document.querySelector(
  ".services_price_table_body"
);
const serviceContraindicationList = document.querySelector(
  ".services_contraindication_list"
);

// Добавляем новые элементы для зон тела
const bodyZonesTitle = document.querySelector(".body_zones_section .services_h2_title");
const bodyZonesList = document.querySelector(".body_zones_list");

const serviceEffectTime = document.getElementById("time");
// const serviceEffectZones = document.getElementById("zones");
const serviceEffectIntensity = document.getElementById("intensity");
const serviceEffectRegularity = document.getElementById("regularity");
const serviceEffectResult = document.getElementById("result");
const serviceEffectTools = document.getElementById("tools");

// const serviceZonesDescription = document.querySelector(
//   ".services_zones_description"
// );

async function getDATA() {
  const data = await fetch("../honey-zone/data.json");
  return data.json();
}
const res = await getDATA();

async function getDataContraindication() {
  const data = await fetch("../dataBase/contraindication.json");
  return data.json();
}
const result = await getDataContraindication();

async function getDataAdditives() {
  const data = await fetch("../dataBase/additives.json");
  return data.json();
}
const recommended = await getDataAdditives();

title.textContent = res.hero_title;
video.src = res.hero_video;
video.poster = res.hero_baner;
description.textContent = res.service_description;

serviceEffectTime.textContent = res.service_details.time;
serviceEffectIntensity.textContent = res.service_details.intensity;
serviceEffectRegularity.textContent = res.service_details.regularity;
serviceEffectResult.textContent = res.service_details.result;
serviceEffectTools.textContent = res.service_details.tools;

const effectsValues = Object.values(res.service_effect);

const createMarkupEffectsList = effectsValues
  .map(
    (effect) => `<li class="service_effects-item">
        <div>
            <p>${effect}</p>
        </div>

        <div>
            <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="okIconTitle" stroke="#f8bf00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000"><path d="m4 13 5 5L20 7"/></svg>
        </div>
      </li>`
  )
  .join(" ");

serviceEffectsList.insertAdjacentHTML("beforeend", createMarkupEffectsList);

// document
//   .getElementById("zones_icon")
//   .querySelector("use")
//   .setAttribute("href", res.zones.icon);
// serviceZonesDescription.textContent = res.zones.description;

const serviceMainPrice = res.service_price;
const createMarkupMainPrice = `<tr>
      <td class="service_price_table_row">${serviceMainPrice.title}</td>
      <td class="service_price_table_row price_table_row_icons">
          ${serviceMainPrice.icons
    .map(
      (icon) =>
        `<svg class="service_price_icons"><use href=${icon.icon}></use></svg>`
    )
    .join(" ")}
      </td>
      <td class="service_price_table_row old_price">${serviceMainPrice.price_old
  }</td>
      <td class="service_price_table_row new_price">${serviceMainPrice.price
  }</td>
    </tr>
`;

servicesPriceTableBody.insertAdjacentHTML("afterbegin", createMarkupMainPrice);

const serviceAdditionalPrice = res.service_price_additional;
const createMarkupAdditionalPrice = serviceAdditionalPrice
  .map(
    (price) => `<tr>
<td class="service_price_table_row">${price.title}</td>
<td class="service_price_table_row price_table_row_icons">
    ${price.icons
        .map(
          (icon) =>
            `<svg class="service_price_icons"><use href=${icon.icon}></use></svg>`
        )
        .join(" ")}
</td>
<td class="service_price_table_row old_price">${price.price_old}</td>
<td class="service_price_table_row new_price">${price.price}</td>
</tr>
`
  )
  .join(" ");

servicesPriceTableBody.insertAdjacentHTML(
  "beforeend",
  createMarkupAdditionalPrice
);

const createMarkupPriceNotes = `<tr>
<td colspan="4" class="service_price_table_row service_price-notes">
Комбо пропозиція - це окремий продукт, на який встановлена спеціальна ціна, тому акційні пропозиції, на кшталт "гарячі години" або "парний масаж - 15%", на нього не діють.
</td>
</tr>`;

servicesPriceTableBody.insertAdjacentHTML("beforeend", createMarkupPriceNotes);

function filterJSON(data, numbers) {
  return data.filter((item) => numbers.includes(item.id));
}

// Протипоказання

const filteredContraindication = filterJSON(
  result.contraindication,
  res.contraindication
);

const createMarkupContraindication = filteredContraindication
  .map(
    (item) => `<li class="services_contraindication_item">
    ${item.title}
    </li>`
  )
  .join(" ");

serviceContraindicationList.insertAdjacentHTML(
  "beforeend",
  createMarkupContraindication
);

// Додатки

const filteredAdditives = filterJSON(recommended.additives, res.additives);

const createMarkupRecommended = filteredAdditives
  .map(
    (service) => `<li class="services_additives_item">
    <div class="features__icon">
        <svg class="services_additives_icon">
            <use href=${service.icon}></use>
        </svg>
    </div>
    <h3 class="services_additives_title">${service.text}</h3>
    <div class="services_additives_block">
    <p class="services_additives_price">+ ${service.price}</p>
    <p class="services_additives_description">${service.description}</p>
    </div>
    </li>`
  )
  .join(" ");

serviceAdditivesList.insertAdjacentHTML("beforeend", createMarkupRecommended);

// Переваги

const serviceAdvantagesList = document.querySelector(".advantages_list");

async function getDataAdvantages() {
  const data = await fetch("../dataBase/advantages.json");
  return data.json();
}
const advantagesService = await getDataAdvantages();

const filteredAdvantages = filterJSON(
  advantagesService.advantages,
  res.advantages
);

const createMarkupAdvantages = filteredAdvantages
  .map(
    (service) => `<li class="services_advantages_item">
      <svg class="services_additives_icon">
        <use href=${service.icon}></use>
      </svg>
      <p class="services_advantages__text margin_auto">${service.text}</p>
    </li>`
  )
  .join(" ");

serviceAdvantagesList.insertAdjacentHTML("beforeend", createMarkupAdvantages);

// Додаємо зображення зон тіла
if (res.body_zones) {
  bodyZonesTitle.textContent = res.body_zones.title;

  const createMarkupBodyZones = res.body_zones.zones
    .map(
      (zone) => `<li class="body_zones_item">
        ${zone}
      </li>`
    )
    .join("");

  bodyZonesList.innerHTML = ""; // Очищуємо перелік перед додаванням
  bodyZonesList.insertAdjacentHTML("beforeend", createMarkupBodyZones);
}
