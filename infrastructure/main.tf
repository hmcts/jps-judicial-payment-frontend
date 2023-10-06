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

resource "azurerm_key_vault_secret" "jps_s2s_client_secret" {
  name         = "jps-s2s-client-secret"
  value        = data.azurerm_key_vault.s2s_vault.microservicekey-jps-judicial-payment-frontend.value
  key_vault_id = data.azurerm_key_vault.jps_shared_key_vault.id
}
