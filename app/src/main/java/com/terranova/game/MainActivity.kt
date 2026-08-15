package com.terranova.game

import android.app.Activity
import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : Activity() {

    private lateinit var web: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        web = WebView(this)

        with(web.settings) {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true

            allowFileAccess = true
            allowContentAccess = true

            cacheMode = WebSettings.LOAD_DEFAULT

            builtInZoomControls = false
            displayZoomControls = false

            loadWithOverviewMode = false
            useWideViewPort = false

            mediaPlaybackRequiresUserGesture = false
        }

        web.webViewClient = WebViewClient()
        web.webChromeClient = WebChromeClient()

        web.setBackgroundColor(0xFF07111F.toInt())

        setContentView(web)

        web.loadUrl("file:///android_asset/index.html")
    }

    override fun onBackPressed() {
        if (web.canGoBack()) {
            web.goBack()
        } else {
            super.onBackPressed()
        }
    }

    override fun onDestroy() {
        web.stopLoading()
        web.destroy()
        super.onDestroy()
    }
}
