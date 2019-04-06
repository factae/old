# [factAE](https://factae.fr)

A simple billing help tool for french freelancers.

## Introduction

factAE helps you to manage your clients, quotations and invoices. For now, it
has been designed for french freelancers (auto-entrepreneurs), but the aim is
to extend it to any kind of company. Be aware that factAE is not an certified
tool: it's just a helper. Check first if your legal status allows you to use
non-certified tools (like auto-entrepreneurs).

## Development

Requirements: yarn, docker, docker-compose.

```bash
git clone https://github.com/soywod/factae.git
cd factae
```

Adjust `web/.env` and `api/.env` files (you have a template in
`web/.example.env` and `api/.example.env`), then:

```bash
yarn install
yarn start
```

- [localhost:3000](http://localhost:3000) for the web
- [localhost:3001](http://localhost:3001) for the api
- [localhost:3002](http://localhost:3002) for [Adminer](https://www.adminer.org/)

The first launch may fail, because the mysql container takes time to init. Just
restart the app once mysql is done.

## TODO

### alpha

- [X] Confirm: improve email design
- [X] Confirm: prevent mail to be considered as SPAM
- [ ] Form: input number max digit
- [ ] Form: input number prevent typing letters
- [ ] Form: input number improve steps
- [X] Contract: hide item list if empty
- [X] Contract: set up badge for status
- [X] Contract: set up fixed size cols list
- [X] Contract: add date
- [X] Dashboard: show graph even if no data
- [ ] Dashboard: show thresholds
- [ ] Navigation: replace profile by menu with quotation, invoice, client,
  profile, logout, contact

### beta

- [ ] Add landing page
- [ ] Add payment
- [ ] Set up paid modules

## Credits

- Design: [Material-UI](https://material-ui.com/), [DOGMS](http://www.dogms.com)
