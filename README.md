# bajie
Micro Serviço de Busca de CEP. **23 Linhas** de código, incluindo comentários :)

Basicamente, um proxy HTTP da biblioteca **[filipedeschamps/cep-promise](https://github.com/filipedeschamps/cep-promise)**.


### Só quero usar.

#### Container docker com esse serviço rodando:

```docker
docker run -it --rm -p 5466:5466 sejakino/bajie:latest
```

#### Consultando CEP's

- Request (pode usar traços, é tranquilo!)
```bash
https://seu-host.com/12345000
```

- Response
```javascript

{
  "cep": "71884720",
  "state": "DF",
  "city": "Brasília",
  "neighborhood": "Riacho Fundo II",
  "street": "QS 20 Bloco C"
}
```

### Opcional: Variáveis de Ambiente:

#### Porta HTTP (Padrão: 5466):

```nginx
HTTP_PORT=5466
```

### Expiração do Cache (Padrão: 1 semana):
```nginx
CACHE_TTL=604800
```
