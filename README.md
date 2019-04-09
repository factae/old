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

### pre-alpha

- [X] Confirm: improve email design
- [X] Confirm: prevent mail to be considered as SPAM
- [X] Contract: hide item list if empty
- [X] Contract: set up badge for status
- [X] Contract: set up fixed size cols list
- [X] Contract: add date
- [X] Dashboard: show graph even if no data
- [X] Dashboard: show thresholds
- [X] Navigation: replace profile by menu with quotation, invoice, client,
  profile, logout, contact

### alpha

- [X] Set up landing page
- [X] Set up payment
- [X] Make logout from backend (to remove cookies)
- [X] Refactor contexts
- [X] Improve auth process (via service)
- [ ] Delete line in contract
- [ ] Set up module to copy contract (paid)
- [ ] Set up module to auto send contracts (paid)
- [ ] Set up module to send form to client (paid)
- [ ] Set up settings page
- [ ] Set up contact page (help/support/feedbacks)
- [ ] Privacy policy + cookie usage
- [ ] Improve SEO
- [X] Fix back button

### Backlog

- [ ] Improve validation (replace HTML5 one)
- [ ] Set up prorata for new freelancers

## Credits

- Design: [Material-UI](https://material-ui.com/), [DOGMS](http://www.dogms.com)
