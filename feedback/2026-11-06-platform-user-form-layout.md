---
title: Формата „Create user“ в супер админската конзола — Search полетата и полето Password чупят оформлението
date: 2026-11-06
status: covered by 006-platform-admin-users — bugs/new/1.0.5--006-platform-admin-users--the-create-user-form-opens-every-tab-is-presentabl--156f5dfd.md (2026-11-06 11:30)
severity: low
---

## Where

Menu path: Platform Admin › Users › Create (формата „Create user“, таб Info)

URL: https://hostify.bioseek.eu/app/platformAdmin/users

## What I did

1. Влязох като супер администратор.
2. Platform Admin › Users › бутона Create.
3. Огледах полетата на формата (избрах роля „Support“).

## What I saw

1. **Счупена визия на Search полетата** (Account, Role …): бутонът с лупата е по-нисък от полето и стои отделно от него, вместо да е една контрола —
   `2026-11-06-platform-user-form-layout-search.png`.
2. **Полето Password е несъразмерно голямо** спрямо останалите — не се съобразява с layout-а на формата —
   `2026-11-06-platform-user-form-layout-password.png`.

Измерено на продукция (версия 1.0.5): полето на Search е 40px, бутонът му 34px (Account, Role, Default account, Owner);
Password е 56px, а всички останали полета във формата са 40px.

## What I expected

Search полето е една контрола: полето и бутонът са с еднаква височина и подравнени. Password е със същата височина като
останалите полета на формата.

## How often

always

## Covered by

- Проверката е в probe-а (`tests/helpers/probe.ts` → form layout: `field-parts`, `field-height`), т.е. важи за ВСЯКА
  форма, която тестовете отварят. Spec `006-platform-admin-users` отваря формата на всеки пуск и е червен заради двата дефекта.
- Същият дефект има и в Settings › Users на акаунта (Role, Default account, Owner, Password) и във формата
  Platform Admin › Accounts › Create (Parent account, Country) — 100 и 002 ще го покажат при следващия пълен пуск.
