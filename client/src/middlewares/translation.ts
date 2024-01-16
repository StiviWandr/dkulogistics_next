import createMiddleware from 'next-intl/middleware'
import { MiddlewareFactory } from './IMiddleware'
import { NextFetchEvent, NextRequest } from 'next/server'
import { locales } from '../api/config'

export const translation: MiddlewareFactory = (next) => {
   return async (request: NextRequest, _next: NextFetchEvent) => {
      const intlMiddleware = createMiddleware({
         defaultLocale: 'ru',
         locales,
         localePrefix: 'as-needed',
      })

      const response = await intlMiddleware(request)

      if (!response) {
         return next(request, _next)
      }

      return response
   }
}
