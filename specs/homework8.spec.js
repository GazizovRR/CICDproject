import { Email, BuildMail } from '../framework/index'
import header from '../framework/config/header'

describe('Отправляем http запросы', () => {
    test('Проверка валидности email, get email_verification/check?email= 200', async () => {
        const emailData = new BuildMail().addUsername().addDomain().generate()
        const email = `${emailData.user}@${emailData.domain}`

        const response = await Email.verificate(email, header.apilayer.apikey)
        const data = await response.json()
        
        expect(data.user).toEqual(emailData.user)
        expect(data.domain).toEqual(emailData.domain)
        expect(data.email).toEqual(email)
        expect(data.format_valid).toEqual(true)
    })

    test.each`
    email                           | expected
    ${''}                           | ${'no_email_address_spplied'}
    ${'fakemail.ru'}                | ${'format_not_valid'}
    ${'@mail.ru'}                   | ${'format_not_valid'}
    ${'fake@.ru'}                   | ${'format_not_valid'}
    ${'fake@mail.'}                 | ${'format_not_valid'}
    `('$email - $expected', async ({ email, expected }) => {
        const response = await Email.verificate(email, header.apilayer.apikey)
        const data = await response.json()
        expect(data.error.type).toEqual(expected)
    })

    test('Проверка валидности email без api_key, get email_verification/check?email= 401', async () => {
        const emailData = new BuildMail().addUsername().addDomain().generate()
        const email = `${emailData.user}@${emailData.domain}`

        const response = await Email.verificate(email)
        const data = await response.json()
        expect(data.message).toEqual('No API key found in request')
    })
})