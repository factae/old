⚠️ *Project archived, due to lack of interest.*

# [factAE](https://factae.fr)

A simple billing tool for french freelancers.

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

- [ ] Improve SEO
- [ ] Add privacy policy + cookie usage

### Backlog

- [ ] Improve form validation (replace HTML5 ones)
- [ ] Set up prorata for new freelancers
- [ ] Set up online sign system (Blockusign)
- [ ] Set up custom theme colors (paid)
- [ ] Improve mails UX

## Credits

- Design: [Material-UI](https://material-ui.com/), [DOGMS](http://www.dogms.com)
