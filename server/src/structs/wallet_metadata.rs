use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use strum::{Display, EnumIter, EnumString};
use ts_rs::TS;

use super::{
    common::{Network, Version},
    wallet_type::WalletType,
};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, TS)]
#[ts(export)]
#[serde(rename_all = "camelCase")]
pub struct WalletMetadata {
    pub slug: String, // Should be unique
    pub name: String,
    pub description: String,
    pub homepage: String,
    pub chains: Vec<Network>,
    pub version: Version,
    pub wallet_type: WalletType,
    pub mobile: Option<Deeplink>,
    pub desktop: Option<Deeplink>,
    pub image: Images,
    pub app: HashMap<Platform, String>,
    pub inject_path: HashMap<Network, String>,
    pub last_updated_timestamp: u64,
}
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, TS)]
#[serde(rename_all = "camelCase")]
#[ts(export)]
pub struct Deeplink {
    pub native: Option<String>,
    pub universal: Option<String>,
    pub redirect_to_app_browser: Option<String>,
}
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct AppLinks {
    pub platform: String,
    pub url: String,
}
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct Images {
    pub default: String,
    pub sm: String,
    pub md: String,
    pub lg: String,
}
#[derive(
    Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize, TS, Display, EnumIter, EnumString,
)]
#[ts(export)]
#[allow(non_camel_case_types)]
pub enum Platform {
    browser,
    ios,
    android,
    macos,
    windows,
    linux,
    chrome,
    firefox,
    opera,
    edge,
    brave,
    safari,
    other,
}
