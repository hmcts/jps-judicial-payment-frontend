provider "azurerm" {
  features {}
}

locals {
 app_full_name = "${var.product}-${var.component}"

 // Shared Resource Group
 sharedResourceGroup = "${var.raw_product}-shared-${var.env}"

 // Vault name
 vaultName = "${var.raw_product}-${var.env}"
}

data "azurerm_key_vault" "jps_shared_key_vault" {
 name                = "${local.vaultName}"
 resource_group_name = "${local.sharedResourceGroup}"
}

data "azurerm_key_vault" "s2s_vault" {
  name                = "s2s-${var.env}"
  resource_group_name = "rpe-service-auth-provider-${var.env}"
}

data "azurerm_key_vault_secret" "s2s_secret" {
  name                = "microservicekey-jps-judicial-payment-frontend"
  key_vault_id        = data.azurerm_key_vault.s2s_vault.id
}

resource "azurerm_key_vault_secret" "jps_s2s_client_secret" {
  name         = "jps-s2s-client-secret"
  value        = data.azurerm_key_vault_secret.s2s_secret.value
  key_vault_id = data.azurerm_key_vault.jps_shared_key_vault.id
}

resource "azurerm_key_vault_secret" "redis6_connection_string" {
  name         = "${var.component}-redis6-connection-string"
  value        = "redis://${urlencode(module.redis6-cache.access_key)}@${module.redis6-cache.host_name}:${module.redis6-cache.redis_port}?tls=true"
  key_vault_id = data.azurerm_key_vault.jps_shared_key_vault.id
}

module "redis" {
  source                   = "git@github.com:hmcts/cnp-module-redis?ref=master"
  product                  = var.product
  location                 = var.location
  env                      = var.env
  common_tags              = var.common_tags
  redis_version            = "6"
  business_area            = "cft" # cft or sds
  sku_name                 = var.sku_name
  family                   = var.family
  capacity                 = var.capacity

  private_endpoint_enabled      = true
  public_network_access_enabled = false
}